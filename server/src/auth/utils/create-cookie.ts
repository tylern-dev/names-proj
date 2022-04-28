import { auth } from 'firebase-admin'

/**
 *creates a cookie based on the idToken provided by firebase auth
 *
 * @export
 * @param {string} idToken
 * @return {*}
 */
export async function createCookie(idToken: string) {
  // Set session expiration to 5 days.
  // const expiresIn = 60 * 60 * 24 * 5 * 1000
  const expiresIn = 60 * 60 * 24 * 5 * 1000
  const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn })
  // Set cookie policy for session cookie.
  const options = { maxAge: expiresIn, httpOnly: true, secure: true }

  return { sessionCookie, options }
}
