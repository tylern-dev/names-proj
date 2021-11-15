import { gql } from 'apollo-server-express'
import { Context, NamesArgs, OrderBy } from '../../types/common'

interface NamesByYearArgs extends NamesArgs {
  year: number
  orderByRank?: OrderBy
}

export const NamesByYear = gql`
  extend type Query {
    namesByYear(skip: Int, take: Int, sex: Sex, year: Int!, orderByRank: OrderBy): [NamesByYear]
  }

  type NamesByYear {
    nameId: ID
    year: Int
    rank: Int
    name: Name
  }
`
export const resolvers = {
  Query: {
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
  },
}
