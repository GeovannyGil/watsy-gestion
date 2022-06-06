// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// eslint-disable-next-line
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, getBytes, deleteObject } from 'firebase/storage'
// eslint-disable-next-line
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
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

export async function setFileClient (uid, name, file, fileStateUpdate, stateUploads) {
  try {
    const storageRef = ref(storage, `clients/${uid}/${name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    return new Promise(resolve => uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            console.log(stateUploads)
            break
          default:
            console.log('Upload is in default state')
        }
      },
      (error) => {
        console.error(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log('File available at', downloadURL)
        // })
        fileStateUpdate(name)
        console.log('Se Termino de subir el archivo')
        return resolve(true)
      }
    ))
  } catch (error) {
    console.error(error)
  }
}

export async function getFileClient (path) {
  try {
    const imageRef = ref(storage, path)

    const url = await getDownloadURL(imageRef)
    return url
  } catch (error) {
    console.error(error)
  }
}

export async function deleteFileClient (uid, name, fileStateDelete) {
  try {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `clients/${uid}/${name}`)
    // Delete the file
    return new Promise(resolve => {
      deleteObject(desertRef).then(() => {
        // File deleted successfully
        return resolve(true)
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error)
      })
    })
  } catch (error) {
    console.error(error)
  }
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
