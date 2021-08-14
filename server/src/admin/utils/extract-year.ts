import path from 'path'

export const extractYear = (fileName: string): string => {
  const year = path.basename(fileName).match(/\d/g).join('')
  return year
}
