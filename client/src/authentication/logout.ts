import { auth } from './config'
export const logout = () => {
  auth.signOut()
}
