import express from 'express'
import { newUser } from './sign-up'

const router = express.Router()
export default router

// place auth routes here
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    await newUser({ email, password })
    res.sendStatus(200)
  } catch (e) {
    throw e
  }
})

router.post('/login', (req, body) => {})
