import { user } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { getPassword } from '../helpers/get-password'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { getUser } from './get-user'

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

    const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })

    res.cookie('token', refreshToken, { httpOnly: true })

    return res.json({ status: true, message: 'Login successful', data: { accessToken } })
  } catch (e: any) {
    res.sendStatus(401)
    throw new Error(e)
  }
}
