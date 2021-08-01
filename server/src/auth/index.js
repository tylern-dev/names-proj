import express from 'express'

const router = express.Router()
export default router

// place auth routes here
router.post('/signup', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

router.post('/login', (req, body) => {})
