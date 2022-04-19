import { user } from '@prisma/client'
import { Request, Response } from 'express'
import { auth } from 'firebase-admin'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { getUser } from './get-user'
// import { addRefreshTokenToDb } from '../helpers/refresh-token'

const cookieOptions = {
  httpOnly: true,
}

export default async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString()

  try {
    const verifiedToken = await auth().verifyIdToken(idToken)
    const user: user = await getUser({ authId: verifiedToken.uid })

    if (!user) return res.status(404).send({ message: 'No valid user found' })
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn })
    // Set cookie policy for session cookie.
    const options = { maxAge: expiresIn, httpOnly: true, secure: true }
    res.cookie('session', sessionCookie, options)
    res.end(JSON.stringify({ status: 'success' }))

    // // TODO: we should add capabilities in the token
    // const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    // const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })

    // // await addRefreshTokenToDb({ token: refreshToken, userId })

    // res.cookie('refresh-token', refreshToken, cookieOptions)
    // res.set('token', accessToken)
  } catch (e: any) {
    res.sendStatus(401).json({ success: false })
    throw new Error(e)
  }
}
