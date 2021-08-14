import express from 'express'

import { addBabyNames } from './add-baby-names'

const router = express.Router()
export default router

//TODO: restrict to admin only
router.post('/add-names', addBabyNames)
