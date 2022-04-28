// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// eslint-disable-next-line
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage'
// eslint-disable-next-line
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

export const auth = getAuth(app)
// eslint-disable-next-line
const db = getFirestore(app)
// eslint-disable-next-line
const storage = getStorage(app)

export async function userExists (uid) {
  const docRef = doc(db, 'users', uid)
  const res = await getDoc(docRef)
  // console.log(res)
  return res.exists()
}

// USER

export async function registerNewUser (user) {
  try {
    const collectionRef = collection(db, 'users')
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error)
  }
}

export async function updateUser (user) {
  try {
    const collectionRef = collection(db, 'users')
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error)
  }
}

export async function getUserInfo (uid) {
  try {
    const docRef = doc(db, 'users', uid)
    const document = await getDoc(docRef)
    return document.data()
  } catch (error) {
    console.error(error)
  }
}

// CLIENT
export async function insertNewClient (client) {
  try {
    const docRef = collection(db, 'clients')
    const res = await addDoc(docRef, client)
    // // console.log(res.id)
    // // console.log(res.path)
    // // console.log(res.firestore)
    // // console.log(res.parent)
    // // console.log(res)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function existsClient (cui) {
  const users = []
  const docsRef = collection(db, 'clients')
  const q = query(docsRef, where('cui', '==', cui))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(doc => {
    users.push(doc.data())
  })

  return users.length > 0 ? users[0].uid : null
}

export async function getClientInfo (docId) {
  try {
    const docRef = doc(db, 'clients', docId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getClients () {
  const clients = []
  try {
    const collectionRef = collection(db, 'clients')
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach(doc => {
      const client = { ...doc.data() }
      client.docId = doc.id
      clients.push(client)
    })
    return clients
  } catch (error) {
    console.error(error)
  }
}

export async function updateClient (docId, client) {
  try {
    const docRef = doc(db, 'clients', docId)
    const res = await setDoc(docRef, client)
    // console.log(res)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function deleteClient (docId) {
  try {
    const docRef = doc(db, 'clients', docId)
    const res = await deleteDoc(docRef)
    // console.log(res)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function logout () {
  await auth.signOut()
}

// export async function getClient (uid) {
//   const clients = []
//   try {
//     const collectionRef = collection(db, 'clients')
//     const q = query(collectionRef, where('uid', '==', uid))
//     const querySnapshot = await getDocs(q)
//     querySnapshot.forEach(doc => {
//       const client = { ...doc }
//       client.docId = doc.id
//       clients.push(client)
//     })
//   } catch (error) {
//     console.error(error)
//   }
// }
