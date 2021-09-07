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

interface NamesByYearArgs extends NamesArgs {
  year: number
  orderByRank?: OrderBy
}

const resolvers = {
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
    //TODO: figure out best way to sort and filter based on rank
    // I removed the cursor and am just using take and skip
    namesByYear: async (
      parent: any,
      { skip = 0, take = 5, sex, year, orderByRank = 'asc' }: NamesByYearArgs,
      { models }: Context
    ) =>
      await models.prisma.popularity.findMany({
        skip,
        take,
        where: { year: year, name: { sex: sex } },
        orderBy: { rank: orderByRank },
        include: { name: true },
      }),

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
  Mutation: {
    addName: () => true,
  },
  Name: {
    popularity: async (parent: any, args: any, { models }: Context) =>
      await models.prisma.name.findUnique({ where: { nameId: { name: parent.name, sex: parent.sex } } }).popularity(),
  },
}
export default resolvers
