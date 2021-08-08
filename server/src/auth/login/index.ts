import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { getUser } from './get-user'

export default async (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body

  if (!email && !password) return res.status(401).json({  message: 'No email or password were supplied' })

  try {
    const user: User = await getUser({ email }) 

    if (!user) return res.status(404).send({ message: 'No valid user found' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' })

    const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })

    res.cookie('token', refreshToken, { httpOnly: true })

    return res.json({ status: true, message: 'Login successful', data: { accessToken } })
  } catch (e) {
    res.sendStatus(401)
    throw new Error(e)
  }
}
