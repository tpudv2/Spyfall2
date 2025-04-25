import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCwUzTEZnI_dCyYvuP71iK8V0iUZRFK_tM",
  authDomain: "spyfallbros.firebaseapp.com",
  databaseURL: "https://spyfallbros-default-rtdb.firebaseio.com/",
  projectId: "spyfallbros",
  storageBucket: "spyfallbros.firebasestorage.app",
  messagingSenderId: "494278374346",
  appId: "1:494278374346:web:46008869629a3609835533"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
