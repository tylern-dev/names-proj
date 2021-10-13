import { refreshTokens } from '.prisma/client'
import { decode, JwtPayload } from 'jsonwebtoken'
import prisma from '../../../client'
export const addRefreshTokenToDb = async ({ token, userId }: { token: string; userId: string }): Promise<void> => {
  // decrypt token
  const decodedToken = decode(token) as JwtPayload
  await addRefreshToken({ userId, jti: decodedToken.jti, exp: decodedToken.exp })
}

export const addRefreshToken = async ({
  userId,
  jti,
  exp,
}: {
  userId: string
  jti: string
  exp: number
}): Promise<refreshTokens> => {
  return await prisma.refreshTokens.create({
    data: {
      userId,
      jti,
      exp,
    },
  })
}
