import AuthProvider from '../components/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { updateUser } from '../services/firebase/firebase'
// import { existsClient } from '../services/firebase/firebase'

export default function Welcome () {
  const navigate = useNavigate()
  const [state, setState] = useState(0)
  const [currentUser, setCurrentUser] = useState({})

  const handleUserLoggedIn = (user) => {
    navigate('/gestiones')
  }

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user)
    setState(3)
  }
  const handleUserNotLoggedIn = () => {
    navigate('/login')
  }

  const handleContinue = async () => {
    // if (cui !== '') {
    //   const exists = await existsClient(cui)
    //   if (exists) {
    //     // console.log('El cliente ya existe')
    //   }else{
    //  }
    // }
    const tmp = { ...currentUser }
    tmp.processCompleted = true
    await updateUser(tmp)
    setState(6)
  }

  if (state === 3 || state === 2) {
    return (
      <>
        <div>Bienvenido {currentUser.email}</div>
        <div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </>
    )
  }

  if (state === 6) {
    return (
      <>
        <div>Empezemos</div>
        <Link to='/clients'>CONTINUAR</Link>
      </>
    )
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      Loading...
    </AuthProvider>
  )
}
