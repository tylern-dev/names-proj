import { Context } from 'src/types/common'
import { gql } from 'apollo-server-express'

interface ICreateRating {
  projectBabyNameId: string
  rating: number
}

export const CreateRating = gql`
  extend type Mutation {
    "This will either create a new rating or update and existing one if it exists."
    createRating(projectBabyNameId: ID, rating: Int): Rating
  }
`
export const resolvers = {
  Mutation: {
    createRating: async (parent: any, args: ICreateRating, { models, user }: Context) => {
      console.log('here')
      // finds if the user is the owner or a guest of the project
      const isUserApartOfProject = await models.prisma.project.findFirst({
        where: {
          OR: [{ owner: { id: user.payload.userId } }, { guests: { some: { user: { id: user.payload.userId } } } }],
        },
      })
      if (isUserApartOfProject) {
        const hasExistingRatingForName = await models.prisma.rating.findFirst({
          where: { AND: [{ babyNameId: args.projectBabyNameId }, { userId: user.payload.userId }] },
        })
        if (hasExistingRatingForName) {
          return await models.prisma.rating.update({
            where: { id: hasExistingRatingForName.id },
            data: { rating: args.rating },
          })
        } else if (!hasExistingRatingForName) {
          return await models.prisma.rating.create({
            data: {
              rating: args.rating,
              user: {
                connect: { id: user?.payload?.userId },
              },
              babyName: { connect: { id: args.projectBabyNameId } },
            },
          })
        }
      }
    },
  },
}
