import * as fs from 'fs'
import { PrismaPromise, name } from '@prisma/client'
import { extractNames } from '../utils/extract-names'
import { Name, transformNames } from '../utils/transform-names'
import { Request, Response } from 'express'
import { extractYear } from './utils/extract-year'
import prismaClient from '../../client'

// const prismaClient = new PrismaClient()
export const addBabyNames = async (req: Request, res: Response) => {
  // eventaully get the text file from the front end
  // const file = req.body
  const filepath = '/workspace/names-proj/raw_name_data/yob2020.txt'
  fs.readFile(filepath, 'utf8', async (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const extractedNames = extractNames(data, filepath)
    const transformedNames = transformNames(extractedNames)
    try {
      // find if the data has already been added
      const year = await handleExtractYear(filepath, res)

      console.log('girl names', transformedNames?.fNames.length)
      await handleBulkBatching(transformedNames?.fNames)
      console.log('boy names', transformedNames?.mNames.length)
      await handleBulkBatching(transformedNames?.mNames)

      res.status(200).json({ message: 'Loaded names succefully!', yearLoaded: year })
      prismaClient.$disconnect()
    } catch (e: any) {
      res.status(500)
      prismaClient.$disconnect()
      throw new Error(e)
    }
  })
}

// Note*
// This function is needed to handle batching. If I don't batch, then the names don't load. They used to load fine usine `addBulkNames()` directly with Prisma 2.30.0, but after upgrading to 3.0.2^, it has now broke.
const handleBulkBatching = async (names: Array<Name>): Promise<void> => {
  const batchLimit = 2000
  let batch = 2000

  try {
    for (let i = 0; i <= names.length; i += batchLimit) {
      await addBulkNames(names.slice(i, batch))
      console.log('here', batch)

      batch += batchLimit
    }
  } catch (e) {
    console.error(e)
  }
  return Promise.resolve()
}

const addBulkNames = async (transformedNames: Array<Name>) => {
  const middle = Math.floor(transformedNames.length / 2)
  const first = transformedNames.slice(0, middle)
  const second = transformedNames.slice(middle, transformedNames.length)
  const firstTransaction = handleTransaction(first)
  const secondTransaction = handleTransaction(second)
  return await Promise.all([firstTransaction, secondTransaction])
}

function handleTransaction(arr: Array<Name>) {
  return prismaClient
    .$transaction(
      arr.map(
        //@ts-ignore
        async ({ name, popularity, sex, year, rank }): PrismaPromise<name> => {
          return await prismaClient.name.upsert({
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
        }
      )
    )
    .then(() => {
      return Promise.resolve()
    })
    .catch((error) =>
      // The error that is happening doesn't seem to be a true error, but if we thow this error, it kills the process.
      console.log('error =>', { ...error })
    )
}

async function handleExtractYear(filepath: string, res: Response) {
  const year = extractYear(filepath)
  const yearFound = await prismaClient.namesYear.findUnique({
    where: {
      year: Number(year),
    },
  })
  if (!yearFound) {
    await prismaClient.namesYear.create({ data: { year: Number(year) } })
    return year
  } else {
    return res.json({
      message: `The year of names (${year}) has already been added. Choose another file. `,
      filepath,
    })
  }
}
/*
        For some reason, this is working fine on the mac. I have added feature flags to the schema.prisma file and reverted the package.json prisma version to 2.30.0.
        I also remove the cookie checker and authentication middleware. I was able to add 3 years with names.

        remove pool thing from postgres url

  */
