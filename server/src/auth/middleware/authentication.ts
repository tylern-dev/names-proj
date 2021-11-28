import { role } from '.prisma/client'
import { NextFunction, Request, Response } from 'express'
import { verify, decode } from 'jsonwebtoken'
import client from '../../../client'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { GUEST } from '../../consts'
const { JWT_ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

interface CookieMap {
  'refresh-token': string
}

interface User {
  id: string
  role: role
}

interface TokenMap {
  accessToken: string
  refreshToken: string
  user: User
}

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies
  const authorization = req.headers.authorization
  // if (!authorization) throw new Error('No authorization provided in header')
  if (!authorization) {
    req.user = GUEST
    return next()
  }
  const token = authorization.split(' ')[1]

  verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (decoded) {
      req.user = decoded
      next()
    } else if (err) {
      checkCookie(cookie)
        .then(({ accessToken, refreshToken }) => {
          res.set('token', accessToken)
          res.cookie('refresh-token', refreshToken)
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
  const refreshToken = cookie['refresh-token']
  return new Promise((resolve, reject) => {
    verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) reject(err)
      if (decoded) {
        //         // const jti = decoded.jti
        //         // const jtiFromDb = await client.refreshTokens.findFirst({
        //         //   where: {
        //         //     jti: jti,
        //         //   },
        //         // })
        try {
          const user = await client.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, role: true },
          })

          const signedAccessToken = await signAccessToken({ userId: user.id, role: user.role })
          const signedRefreshToken = await signRefreshToken({ userId: user.id })

          resolve({ accessToken: signedAccessToken, refreshToken: signedRefreshToken, user })
        } catch (e) {
          reject(e)
        }
      } else {
        throw new Error('Please login again')
      }
    })
  })
}
