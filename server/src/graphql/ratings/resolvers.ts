import { Context } from 'src/types/common'

const resolvers = {
  Mutation: {
    createRating: async (parent: any, { projectBabyNameId, rating }: any, { models, user }: Context) => {
      // finds if the user is the owner or a guest of the project
      const isUserApartOfProject = await models.prisma.project.findFirst({
        where: {
          OR: [{ owner: { id: user.payload.userId } }, { guests: { some: { user: { id: user.payload.userId } } } }],
        },
      })
      if (isUserApartOfProject) {
        const hasExistingRatingForName = await models.prisma.rating.findFirst({
          where: { AND: [{ babyNameId: projectBabyNameId }, { userId: user.payload.userId }] },
        })
        if (hasExistingRatingForName) {
          return await models.prisma.rating.update({
            where: { id: hasExistingRatingForName.id },
            data: { rating: rating },
          })
        } else if (!hasExistingRatingForName) {
          return await models.prisma.rating.create({
            data: {
              rating: rating,
              user: {
                connect: { id: user?.payload?.userId },
              },
              babyName: { connect: { id: projectBabyNameId } },
            },
          })
        }
      }
    },
  },
}

export default resolvers
