import { NextFunction, Request, Response } from 'express'
import { verify, decode } from 'jsonwebtoken'
import client from '../../../client'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
const { JWT_ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

interface CookieMap {
  'x-refresh-token': string
}

interface TokenMap {
  accessToken: string
  refreshToken: string
}

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies
  const authorization = req.headers.authorization
  if (!authorization) throw new Error('No authorization provided in header')
  const token = authorization.split(' ')[1]

  verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (decoded) {
      req.user = decoded
      next()
    } else if (err) {
      checkCookie(cookie)
        .then(({ accessToken, refreshToken }) => {
          res.set('x-token', accessToken)
          res.cookie('x-refresh-token', refreshToken)
          console.log(decode(accessToken))
          req.user = decode(accessToken)
          next()
        })
        .catch(() => {
          res.status(403).json({ message: 'Please login again' })
        })
    }
  })
}

const checkCookie = (cookie: CookieMap): Promise<TokenMap> => {
  const token = cookie['x-refresh-token']
  return new Promise((resolve, reject) => {
    verify(token, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) reject(err)
      if (decoded) {
        const jti = decoded.jti
        const jtiFromDb = await client.refreshTokens.findFirst({
          where: {
            jti: jti,
          },
        })
        if (jtiFromDb.validToken) {
          const user = await client.user.findUnique({
            where: { id: jtiFromDb.userId },
            select: { id: true, role: true },
          })
          const signedAccessToken = signAccessToken({ userId: user.id, role: user.role })
          const signedRefreshToken = signRefreshToken({ userId: user.id })
          const [accessToken, refreshToken] = Promise.all([signedAccessToken, signedRefreshToken]) as any
          resolve({ accessToken, refreshToken })
        } else {
          throw new Error('Please login again')
        }
      }
    })
  })
}
