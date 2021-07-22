import express from 'express'

const app = express()
export default app

app.get('/', (req, res) => {
  res.send({ test: 'YES' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req)
})
