import { transformNameData } from './extract-names'

describe('extracting names util', () => {
  it('should extract names from array and transfrom them', () => {
    const mockPath = '2021.txt'
    const mockData = ['Test', 'F', '1000', 'TestName2', 'M', '2000']
    expect(transformNameData(mockData, mockPath)).toMatchObject([
      { name: 'Test', sex: 'F', popularity: '1000', year: '2021' },
      { name: 'TestName2', sex: 'M', popularity: '2000', year: '2021' },
    ])
  })
})
