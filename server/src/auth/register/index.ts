import { hash } from 'bcrypt'
import { Response, Request } from 'express'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import { newUser } from './new-user'

type UserData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName } = req.body
  if (!(email && password)) {
    res.status(400).send('All input is required')
  }

  try {
    const hashedPassword = await hash(password, 12)
    if (!hashedPassword) throw new Error('Error building password hash')

    const userData: UserData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }
    const user = await newUser(userData)

    const accessToken = await signAccessToken({ userId: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ userId: user.id, role: user.role })
    res.cookie('token', refreshToken, { httpOnly: true })
    res.json({ status: true, message: 'login success', data: { accessToken } })
  } catch (e) {
    res.sendStatus(401)
    throw new Error(e)
  }
}
