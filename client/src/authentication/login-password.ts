import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { auth } from './config'
import request from '../utils/request'

export const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const forceRefreshToken = true
  try {
    //TODO: handle csrf
    setPersistence(auth, browserLocalPersistence)

    const result = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await result.user.getIdToken(forceRefreshToken)
    await request({
      url: 'auth-api/login',
      method: 'POST',
      data: { idToken },
    })
  } catch (e) {
    console.log(e)
  }
}
