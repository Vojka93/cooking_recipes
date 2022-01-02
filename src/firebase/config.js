import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDE9cdIuKyiKcobVu2lMsQyd8tY3LNn0KM',
  authDomain: 'cooking-ninja-site-53254.firebaseapp.com',
  projectId: 'cooking-ninja-site-53254',
  storageBucket: 'cooking-ninja-site-53254.appspot.com',
  messagingSenderId: '639091843089',
  appId: '1:639091843089:web:759ca42da867d0406851b0',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }