import path from 'path'
import { extractYear } from '../admin/utils/extract-year'

export function extractNames(names: string, filePath: string) {
  // splits the string on the \r and \n and filters out any spaces
  const convertAndFixNames = names.split(/[\r,\n]/g).filter((i) => i !== '')

  // console.log(convertAndFixNames);
  const groupedNames = transformNameData(convertAndFixNames, filePath)

  return groupedNames
}

export function transformNameData(data: any, filePath: string) {
  const group = []
  const groupByAmount = 3
  const year = extractYear(filePath)
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
