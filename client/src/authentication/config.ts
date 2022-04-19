import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyAJoOthPTbRZBsKdsewPi1de8JNRdGyfa4',
  authDomain: 'baby-names-app-558ef.firebaseapp.com',
  projectId: 'baby-names-app-558ef',
  storageBucket: 'baby-names-app-558ef.appspot.com',
  messagingSenderId: '344019531335',
  appId: '1:344019531335:web:807cdcb8c761b76daf2362',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
