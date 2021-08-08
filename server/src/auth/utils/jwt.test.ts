import {signAccessToken, signRefreshToken} from './jwt'

describe('it should generate tokens', () => {
  it('should generate a refresh token', async () => {
    const refreshToken = await signRefreshToken({test: 'test'})
    expect(refreshToken).not.toBeNull()

  })
  it('should generate an access token', async() => {
    const accessToken = await signAccessToken({test: 'test'})
    expect(accessToken).not.toBeNull()
  })
})

