import { transformNameData } from './extract-names.js'

describe('extracting names util', () => {
  it('should extract names from array and transfrom them', () => {
    const mockData = ['Test', 'F', '1000', 'TestName2', 'M', '2000']
    expect(transformNameData(transformNameData)).toBe([
      { name: 'Test', sex: 'F', popularity: '1000' },
      { name: 'TestName2', sex: 'M', popularity: '2000' },
    ])
  })
})
