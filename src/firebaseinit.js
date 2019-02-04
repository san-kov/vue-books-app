import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

export default firebase.initializeApp(firebaseConfig).firestore()
