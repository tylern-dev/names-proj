import { user } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { getPassword } from '../helpers/get-password'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { getUser } from './get-user'
// import { addRefreshTokenToDb } from '../helpers/refresh-token'

const cookieOptions = {
  httpOnly: true,
}

export default async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email && !password) return res.status(401).json({ message: 'No email or password were supplied' })

  try {
    const user: user = await getUser({ email })
    if (!user) return res.status(404).send({ message: 'No valid user found' })

    const userId = user.id

    const userPassword = await getPassword(userId)

    const isPasswordValid = await bcrypt.compare(password, userPassword.password)

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' })

    // TODO: we should add capabilities in the token
    const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })

    // await addRefreshTokenToDb({ token: refreshToken, userId })

    res.cookie('refresh-token', refreshToken, cookieOptions)
    res.set('token', accessToken)
    console.log({ accessToken, refreshToken })
    return res.json({ success: true, message: 'Login successful' })
  } catch (e: any) {
    res.sendStatus(401).json({ success: false })
    throw new Error(e)
  }
}
