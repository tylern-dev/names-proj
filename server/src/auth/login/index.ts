import { user } from '@prisma/client'
import { Request, Response } from 'express'
import { auth } from 'firebase-admin'
import { getUser } from './get-user'

export default async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString()

  try {
    const checkRevoked = true
    const verifiedToken = await auth().verifyIdToken(idToken, checkRevoked)

    const user: user = await getUser({ authId: verifiedToken.uid })
    await auth().setCustomUserClaims(verifiedToken.uid, { role: user.role })

    if (!user) return res.status(404).send({ message: 'No valid user found' })

    res.cookie('user', idToken)
    res.end(JSON.stringify({ status: 'success' }))
  } catch (e) {
    res.sendStatus(401).json({ success: false }).end()
    console.error('Error in Login', e)
  }
}
