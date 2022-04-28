import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'

import { logout } from '../services/firebase/firebase'

export default function SignOut () {
  useEffect(() => { }, [])
  const navigate = useNavigate()

  return (
    <AuthProvider
      onUserLoggedIn={async () => {
        await logout()
        navigate('/login')
      }}
      onUserNotLoggedIn={() => {
        navigate('/login')
      }}
    />
  )
}
