import { toTitleCase } from '../utils/convert-title-case'
import { Context } from '../../types/common'
import { sex } from '@prisma/client'

interface NameArgs {
  name: string
  nameId: string
  sex?: sex
}

type NamesArgs = {
  cursorPosition: number
  take: number
  sex?: sex
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
    names: async (parent: any, { cursorPosition = 1, take = 5, sex }: NamesArgs, { models }: Context) => {
      const names = await models.prisma.name.findMany({
        take: take,
        skip: cursorPosition === 1 ? 0 : 1,
        orderBy: { cursorId: 'asc' },
        include: { popularity: true },
        where: { sex: sex },
        cursor: { cursorId: cursorPosition },
      })
      const lastNameInResults = names[take - 1]
      const cursor = lastNameInResults.cursorId
      return {
        names,
        cursor,
      }
    },
  },
  Mutation: {
    addName: () => true,
  },
  Name: {
    popularity: (parent: any, args: any, { models }: Context) =>
      models.prisma.name.findUnique({ where: { nameId: { name: parent.name, sex: parent.sex } } }).popularity(),
  },
}
export default resolvers
