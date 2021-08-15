import { toTitleCase } from './convert-title-case'

describe('Convert to title case', () => {
  it('should convert string to proper name', () => {
    expect(toTitleCase('test')).toEqual('Test')
  })
})
