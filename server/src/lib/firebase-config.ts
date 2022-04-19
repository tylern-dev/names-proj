import dotenv from 'dotenv'
import * as admin from 'firebase-admin'
dotenv.config()
const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } = process.env

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: CLIENT_EMAIL,
    projectId: PROJECT_ID,
  }),
})
