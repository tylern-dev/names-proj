import { user } from '@prisma/client'
import { Request, Response } from 'express'
import { auth } from 'firebase-admin'
import { createCookie } from '../utils/create-cookie'
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

    const { options, sessionCookie } = await createCookie(idToken)

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
