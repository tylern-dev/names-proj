export type Name = {
  popularity: number | string
  year: number | string
  name: string
  sex: 'M' | 'F'
  rank?: number
}

interface TransformedNameResult {
  mNames: Name[]
  fNames: Name[]
}

export const transformNames = (data: Array<Name>): TransformedNameResult => {
  const transformedNames = data.map(({ popularity, year, ...rest }) => ({
    ...rest,
    popularity: Number(popularity),
    year: Number(year),
  }))
  const mNames = transformedNames.filter(({ sex }) => sex === 'M')
  const fNames = transformedNames.filter(({ sex }) => sex === 'F')

  return {
    mNames: addRanking(mNames),
    fNames: addRanking(fNames),
  }
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

      // if the popularity is the same keep ranking tied
    } else if (Number(name.popularity) === Number(arr[i + 1 !== undefined ? i + 1 : i].popularity)) {
      newRankingArray.push({
        ...name,
        rank,
      })
      // increase ranking
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
