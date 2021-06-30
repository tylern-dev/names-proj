const fs = require('fs')
const path = require('path')

const filepath = '/home/tyler/developer/tutorials/proj-names/names/yob2020.txt'
fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  const year = path.basename(filepath)
  extractNames(data)
})

function extractNames(names) {
  // splits the string on the \r and \n and filters out any spaces
  const convertAndFixNames = names.split(/[\r,\n]/g).filter((i) => i !== '')

  // console.log(convertAndFixNames);
  const groupedNames = transformNameData(convertAndFixNames, 3)
  console.log(groupedNames)
}

function transformNameData(data, n) {
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
