const { PrismaClient } = require('@prisma/client') // eslint-disable-line
const transformNames = require('../utils/transform-names') //eslint-disable-line
const prisma = new PrismaClient()

const rawData = [
  { name: 'Olivia', sex: 'F', popularity: '17535', year: '2020' },
  { name: 'Emma', sex: 'F', popularity: '15581', year: '2020' },
  { name: 'Ava', sex: 'F', popularity: '13084', year: '2020' },
  { name: 'Charlotte', sex: 'F', popularity: '13003', year: '2020' },
  { name: 'Sophia', sex: 'F', popularity: '12976', year: '2020' },
  { name: 'Amelia', sex: 'F', popularity: '12704', year: '2020' },
  { name: 'Isabella', sex: 'F', popularity: '12066', year: '2020' },
  { name: 'Mia', sex: 'F', popularity: '11157', year: '2020' },
  { name: 'Evelyn', sex: 'F', popularity: '9445', year: '2020' },
  { name: 'Liam', sex: 'M', popularity: '19659', year: '2020' },
  { name: 'Noah', sex: 'M', popularity: '18252', year: '2020' },
  { name: 'Oliver', sex: 'M', popularity: '14147', year: '2020' },
  { name: 'Elijah', sex: 'M', popularity: '13034', year: '2020' },
  { name: 'William', sex: 'M', popularity: '12541', year: '2020' },
  { name: 'James', sex: 'M', popularity: '12250', year: '2020' },
  { name: 'Benjamin', sex: 'M', popularity: '12136', year: '2020' },
  { name: 'Lucas', sex: 'M', popularity: '11281', year: '2020' },
]

// const transformedNameData = transformNames(rawData)

// async function seed() {
//   transformedNameData.forEach(async (name) => {
//     const nameId = await prisma.name.findFirst({
//       where: {
//         name: name.name,
//       },
//       select: {
//         id: true,
//       },
//     })
//     await prisma.name.upsert({
//       where: {
//         id: nameId.id,
//       },
//       update: {
//         popularity: {
//           create: {
//             rank: name.rank,
//             popularity: name.popularity,
//             year: name.year,
//           },
//         },
//       },
//       create: {
//         name: name.name,
//         sex: name.sex === 'M' ? 'MALE' : 'FEMALE',
//         popularity: {
//           create: {
//             rank: name.rank,
//             popularity: name.popularity,
//             year: name.year,
//           },
//         },
//       },
//     })
//   })
// }

// seed()

// async function seed() {
//   console.log(transformedNameData)
//   transformedNameData.forEach(async (name) => {
//     await prisma.name.upsert({
//       where: {
//         name: name.name,
//       },
//       update: {
//         popularity: {
//           create: {
//             rank: name.rank,
//             popularity: name.popularity,
//             year: name.year,
//           },
//         },
//       },
//       create: {
//         name: name.name,
//         sex: name.sex === 'M' ? 'MALE' : 'FEMALE',
//         popularity: {
//           create: {
//             rank: name.rank,
//             popularity: name.popularity,
//             year: name.year,
//           },
//         },
//       },
//     })
//   })
// }

// seed()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect
//   })

// module.exports = seed
