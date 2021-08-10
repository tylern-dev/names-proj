import * as fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { extractNames } from '../utils/extract-names'
import { transformNames } from '../utils/transform-names'
import { Request, Response } from 'express'

const prismaClient = new PrismaClient()
export const addBabyNames = (req: Request, res: Response) => {
  const file = req.body
  const filepath = '/home/tyler/developer/proj-names/raw_name_data/yob2020.txt'
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(extractNames(data))
  })
  // const extractedNames = extractNames()
  res.send(200)
}
