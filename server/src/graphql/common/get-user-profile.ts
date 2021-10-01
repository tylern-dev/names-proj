import { Context } from 'src/types/common'

export const getUserProfile = async (context: Context) => {
  const { models, user } = context

  return await models.prisma.userProfile.findFirst({ where: { userId: user.payload.userId } })
}
