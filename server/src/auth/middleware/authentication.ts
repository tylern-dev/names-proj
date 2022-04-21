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
  const cookie = req.cookies.session
  console.log(cookie)
  next()
}
