import express from 'express'
import register from './register'
import login from './login'

const router = express.Router()
export default router

// place auth routes here
router.post('/register', register)

router.post('/login', login)

router.post('/forgot', (req, res) => {
  console.log(req)
})

router.post('/logout', (req, res) => {
  // invalidate refresh token
})
