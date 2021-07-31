import crypto from 'crypto'

export default function generateErrorCode() {
  if (!message) return undefined
  let hash = ''
  try {
    hash = sha256(message)
  } catch (error) {
    console.error(error)
  }
  return hash.slice(0, 10).toUpperCase()
}
