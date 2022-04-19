import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
} from 'firebase/auth'
import { auth } from './config'
import axios from 'axios'

export const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const forceRefreshToken = true
  try {
    setPersistence(auth, inMemoryPersistence)

    const result = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await result.user.getIdToken(forceRefreshToken)

    axios.post('auth-api/login', {
      idToken,
    })
  } catch (e) {
    console.log(e)
  }
}
