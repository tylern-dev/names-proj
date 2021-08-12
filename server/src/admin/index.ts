import express from 'express'

import { addBabyNames } from './add-baby-names'

const router = express.Router()
export default router

router.post('/add-names', addBabyNames)
