import { extractYear } from './extract-year'

describe('extract year', () => {
  it('should extract the year from the filename', () => {
    expect(extractYear('test2000.txt')).toBe('2000')
  })
})
