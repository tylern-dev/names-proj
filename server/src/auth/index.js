import express from 'express'
import { newUser } from './sign-up'

const router = express.Router()
export default router

// place auth routes here
router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  newUser({ email, password }).then((result) => console.log(result))

  res.sendStatus(200)
})

router.post('/login', (req, body) => {})
