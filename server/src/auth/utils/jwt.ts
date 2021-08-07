import { sign } from 'jsonwebtoken'
import createError, { HttpError } from 'http-errors'
import dotenv from 'dotenv'

dotenv.config()

const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env
 

export const signAccessToken = (payload:any): Promise<string | HttpError> => {
  return new Promise((resolve, reject) => {
    sign(
      { payload },
      JWT_ACCESS_TOKEN_SECRET!,
      { algorithm: 'HS256', expiresIn: JWT_ACCESS_TOKEN_LIFE },
      (err, token) => {
        if (err) reject(createError.InternalServerError)
        resolve(token)
      }
    )
  })
}

export const signRefreshToken = (payload:any): Promise<string | HttpError> => {
  return new Promise((resolve, reject) => {
    sign({ payload }, REFRESH_TOKEN_SECRET!, { algorithm: 'HS256', expiresIn: REFRESH_TOKEN_LIFE }, (err, token) => {
      if (err) reject(createError.InternalServerError)
      resolve(token)
    })
  })
}
