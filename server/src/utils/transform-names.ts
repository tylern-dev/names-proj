type Name = {
  popularity: number
  year: number
  name: string
  sex: 'M' | 'F'
  rank: number
}

export function transformNames(data: Array<Name>) {
  const transformedNames = data.map(({ popularity, year, ...rest }) => ({
    ...rest,
    popularity: Number(popularity),
    year: Number(year),
  }))
  const mNames = transformedNames.filter(({ sex }) => sex === 'M')
  const fNames = transformedNames.filter(({ sex }) => sex === 'F')

  return [...addRanking(mNames), ...addRanking(fNames)]
}

function addRanking(data: Array<Name>) {
  let rank = 0
  const newRankingArray: Array<Name> = []
  data.forEach((name, i, arr) => {
    if (arr[i + 1] === undefined) {
      newRankingArray.push({
        ...name,
        rank: rank + 1,
      })
    } else if (Number(name.popularity) >= Number(arr[i + 1 !== undefined ? i + 1 : i].popularity)) {
      rank++
      newRankingArray.push({
        ...name,
        rank: rank,
      })
    }
  })
  return newRankingArray
}

module.exports = transformNames
