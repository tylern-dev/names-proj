import express from 'express'

// import noCache from 'nocache'
// import { csp, generateNonces } from './utils/csp.js'

const app = express()
export default app

app.get('/', (req, res) => {
  res.send({ test: 'YES' })
})
