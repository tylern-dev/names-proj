import crypto from 'crypto'

function sha256(message: string): string {
  return crypto.createHash('sha256').update(message).digest('hex');
}


export default function generateErrorCode(message: string | undefined) {
  if (!message) return undefined
  let hash = ''
  try {
    hash = sha256(message)
  } catch (error) {
    console.error(error)
  }
  return hash.slice(0, 10).toUpperCase()
}
