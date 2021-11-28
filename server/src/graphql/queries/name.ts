import { gql } from 'apollo-server-express'
import { toTitleCase } from '../utils/convert-title-case'
import { Context, OrderBy } from '../../types/common'
import { sex } from '@prisma/client'

interface NameArgs {
  name: string
  nameId: string
  sex?: sex
}

interface NamesArgs {
  skip: number
  take: number
  orderByName?: OrderBy
  sex?: sex
}

export const NameTypeDef = gql`
  extend type Query {
    name(name: String, nameId: String): [Name]
    names(skip: Int, take: Int, sex: Sex, orderByName: OrderBy): Names
  }

  type Names {
    names: [Name]
    # cursor: Int
  }

  enum Sex {
    M
    F
  }

  enum OrderBy {
    asc
    desc
  }
`

export const resolvers = {
  Query: {
    name: async (parent: any, { name, nameId }: NameArgs, { models }: Context) => {
      const titleCaseName = toTitleCase(name).trim()

      if (nameId && !name) {
        const data = await models.prisma.name.findUnique({
          where: { id: nameId },
        })
        return [data]
      }
      return await models.prisma.name.findMany({
        where: { name: titleCaseName },
      })
    },

    names: async (parent: any, { take = 10, skip = 0, sex, orderByName = 'asc' }: NamesArgs, { models }: Context) => {
      const names = await models.prisma.name.findMany({
        take: take,
        skip: skip,
        where: {
          sex: sex,
        },
        orderBy: { name: orderByName },
      })
      return {
        names,
      }
    },
  },
  Name: {
    popularity: async (parent: any, args: any, { models }: Context) =>
      await models.prisma.name.findUnique({ where: { nameId: { name: parent.name, sex: parent.sex } } }).popularity(),
  },
}
