import fs from 'fs'
import path from 'path'

const filepath = '/home/tyler/developer/proj-names/raw_name_data/yob2020.txt'
fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  extractNames(data)
})

export function extractNames(names: string) {
  // splits the string on the \r and \n and filters out any spaces
  const convertAndFixNames = names.split(/[\r,\n]/g).filter((i) => i !== '')

  // console.log(convertAndFixNames);
  const groupedNames = transformNameData(convertAndFixNames)

  return groupedNames
}

export function transformNameData(data: any) {
  const group = []
  const groupByAmount = 3
  const year = path.basename(filepath).match(/\d/g).join('')
  for (let i = 0, j = 0; i < data.length; i++) {
    if (i >= groupByAmount && i % groupByAmount === 0) {
      j++
    }
    group[j] = {
      name: data[i - 2],
      sex: data[i - 1],
      popularity: data[i],
      year: year,
    }
  }
  return group
}
