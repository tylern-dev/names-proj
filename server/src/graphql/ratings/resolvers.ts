import { Context } from 'src/types/common'

const resolvers = {
  Mutation: {
    createRating: async (parent: any, { projectBabyNameId, rating }: any, { models, user }: Context) =>
      models.prisma.projectBabyName.update({
        where: { id: projectBabyNameId },
        data: {
          ratings: {
            create: {
              rating: rating,
              user: {
                connect: {
                  id: user?.payload?.userId,
                },
              },
            },
          },
        },
      }),
  },
}

export default resolvers
