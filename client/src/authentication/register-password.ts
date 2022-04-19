import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './config'

export const registerWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const idToken = await result.user.getIdToken()

    axios.post('/auth-api/register', {
      email,
      password,
      firstName,
      lastName,
      idToken,
    })
  } catch (e) {
    console.error(e)
  }
}
