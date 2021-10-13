import { sign } from 'jsonwebtoken'
import createError from 'http-errors'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env

export const signAccessToken = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(
      { payload },
      JWT_ACCESS_TOKEN_SECRET ?? '',
      { algorithm: 'HS256', expiresIn: JWT_ACCESS_TOKEN_LIFE },
      (err, token) => {
        if (err) reject(createError.InternalServerError)
        resolve(token)
      }
    )
  })
}

export const signRefreshToken = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(
      { ...payload, jti: uuidv4() },
      REFRESH_TOKEN_SECRET ?? '',
      { algorithm: 'HS256', expiresIn: REFRESH_TOKEN_LIFE },
      (err, token) => {
        if (err) reject(createError.InternalServerError)
        resolve(token)
      }
    )
  })
}
