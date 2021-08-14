import * as fs from 'fs'
import { PrismaClient, PrismaPromise, name } from '@prisma/client'
import { extractNames } from '../utils/extract-names'
import { Name, transformNames } from '../utils/transform-names'
import { Request, Response } from 'express'
import { extractYear } from './utils/extract-year'
import { resourceLimits } from 'worker_threads'

const prismaClient = new PrismaClient()
export const addBabyNames = async (req: Request, res: Response) => {
  // eventaully get the text file from the front end
  // const file = req.body
  const filepath = '/home/tyler/developer/proj-names/raw_name_data/yob2018.txt'
  fs.readFile(filepath, 'utf8', async (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const extractedNames = extractNames(data, filepath)
    const transformedNames = transformNames(extractedNames)

    try {
      //find if the data has already been added
      const year = extractYear(filepath)
      const yearFound = await prismaClient.namesYear.findUnique({
        where: {
          year: Number(year),
        },
      })
      if (!yearFound) {
        await prismaClient.namesYear.create({ data: { year: Number(year) } })
      } else {
        return res.json({
          message: `The year of names (${year}) has already been added. Choose another file. `,
          filepath,
        })
      }

      await addBulkNames(transformedNames.fNames)
      await addBulkNames(transformedNames.mNames)

      res.status(200).json({ message: 'Loaded names succefully!' })
      prismaClient.$disconnect
    } catch (e) {
      res.status(500)
      prismaClient.$disconnect
      throw new Error(e)
    }
  })
  // const extractedNames = extractNames()
}

const addBulkNames = async (transformedNames: Array<Name>) =>
  await prismaClient.$transaction(
    transformedNames.map(
      //@ts-ignore
      async ({ name, popularity, sex, year, rank }): PrismaPromise<name> =>
        await prismaClient.name.upsert({
          where: {
            nameId: {
              name,
              sex,
            },
          },
          update: {
            popularity: {
              create: {
                popularity: Number(popularity),
                year: Number(year),
                rank,
              },
            },
          },
          create: {
            name,
            sex,
            popularity: {
              create: {
                popularity: Number(popularity),
                year: Number(year),
                rank,
              },
            },
          },
        })
    )
  )
