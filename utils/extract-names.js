const fs = require('fs')

const filepath = '/home/tyler/developer/tutorials/proj-names/names/yob2020.txt'
fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  extractNames(data)
})

function extractNames(names) {
  // splits the string on the \r and \n and filters out any spaces
  const convertAndFixNames = names.split(/[\r,\n]/g).filter((i) => i !== '')

  // console.log(convertAndFixNames);
  const groupedNames = groupArray(convertAndFixNames)
  console.log(groupedNames)
}
// help https://stackoverflow.com/questions/38048497/group-array-values-in-group-of-3-objects-in-each-array-using-underscore-js
function groupArray(arr) {
  const groupByEveryThree = 3
  return arr.reduce(
    (accum, current, i) =>
      (i % groupByEveryThree
        ? accum[accum.length - 1].push({
            name: current[i],
            sex: current[i + 1],
            popularity: current[i + 2],
          })
        : accum.push(current)) && accum,
    []
  )
}
