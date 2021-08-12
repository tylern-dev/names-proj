import * as fs from 'fs'
import { PrismaClient, PrismaPromise, name } from '@prisma/client'
import { extractNames } from '../utils/extract-names'
import { transformNames } from '../utils/transform-names'
import { Request, Response } from 'express'

const prismaClient = new PrismaClient()
export const addBabyNames = async (req: Request, res: Response) => {
  // eventaully get the text file from the front end
  // const file = req.body
  const filepath = '/home/tyler/developer/proj-names/raw_name_data/yob2019.txt'
  fs.readFile(filepath, 'utf8', async (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const extractedNames = extractNames(data, filepath)
    const transformedNames = transformNames(extractedNames)
    try {
      await prismaClient.$transaction(
        transformedNames.fNames.map(
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

      await prismaClient.$transaction(
        transformedNames.mNames.map(
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

// const addBulkNames = async (transformedNames: Array<Name>) => {
//   const nameAndSexOnly = transformedNames.map(({ name, sex }) => ({ name, sex }))
//   prismaClient.
//   return await prismaClient.name
//     .createMany({
//       data: nameAndSexOnly,
//       skipDuplicates: true,

//     })
//     .then(() => {})

// }
