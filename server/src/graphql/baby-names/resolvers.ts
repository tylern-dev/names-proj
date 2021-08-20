import { toTitleCase } from '../utils/convert-title-case'
import { Context } from '../../types/common'

interface NameArgs {
  name: string
  nameId: string
}

type NamesArgs = {
  cursorPosition: number
  take: number
}

const resolvers = {
  Query: {
    name: async (parent: any, { name, nameId }: NameArgs, { models }: Context) => {
      const titleCaseName = toTitleCase(name).trim()

      if (nameId && !name) {
        const data = await models.prisma.name.findUnique({
          where: { id: nameId },
          include: { popularity: true },
        })
        return [data]
      }
      return await models.prisma.name.findMany({
        where: { name: titleCaseName },
        include: { popularity: true },
      })
    },
    names: async (parent: any, { cursorPosition = 1, take = 5 }: NamesArgs, { models }: Context) => {
      const names = await models.prisma.name.findMany({
        take: take,
        skip: cursorPosition === 1 ? 0 : 1,
        orderBy: { cursorId: 'asc' },
        include: { popularity: true },

        cursor: { cursorId: cursorPosition },
      })
      const lastNameInResults = names[take - 1]
      const cursor = lastNameInResults.cursorId
      return {
        names,
        cursor,
      }
    },
    age: () => 1,
  },
  Mutation: {
    addName: () => true,
  },
}
export default resolvers
