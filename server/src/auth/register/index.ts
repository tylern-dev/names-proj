import { Prisma } from '@prisma/client'
import { Response, Request } from 'express'
import { auth } from 'firebase-admin'
import { findUser } from '../helpers/find-user'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { newUser } from './new-user'

interface UserData {
  firstName: string
  lastName: string
  email: string
  authId: string
  claims?: Prisma.JsonArray
}

export default async (req: Request, res: Response): Promise<Response> => {
  const { email, firstName, lastName, idToken, claims } = req.body
  const checkRevokedToken = true
  try {
    const verifiedToken = await auth().verifyIdToken(idToken, checkRevokedToken)
    const uid = verifiedToken.uid
    const userData: UserData = {
      firstName,
      lastName,
      email,
      authId: uid,
      claims,
    }
    const doesUserExist = await findUser(verifiedToken.uid)
    if (doesUserExist) {
      return res.status(409).json({ message: 'User already exists' })
    }
    const user = await newUser(userData)

    // const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    // const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })
    // res.cookie('token', refreshToken, { httpOnly: true })
    res.json({ status: true, message: 'register success' })
  } catch (e: any) {
    res.status(500)
    throw new Error(e.data)
  }
}
