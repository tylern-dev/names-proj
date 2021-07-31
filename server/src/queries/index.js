import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newName = await prisma.name.create({
    data:{
      name: '',
      sex,
      popularity:{
        create:{
          rank: ,
          year: ,
        }
      }
    }
  })
}

main()
  .catch()
  .finally(async () => await prisma.disconnect())
