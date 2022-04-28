import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, registerNewUser, userExists, getUserInfo } from '../services/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  & .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function AuthProvider ({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }) {
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid)
        if (isRegistered) {
          // TODO: REDIRIGIR A CLIENTS
          const userInfo = await getUserInfo(user.uid)
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo)
            return
          }
          onUserNotRegistered(userInfo)
          return
        }
        // TODO: REDIRIGIR A CREAR USUARIO
        await registerNewUser({
          uid: user.uid,
          email: user.email,
          profilePicture: '',
          username: '',
          processCompleted: false
        })
        onUserNotRegistered(user)
        return
      }
      // TODO: NO HAY NADIE LOGEADO
      onUserNotLoggedIn()
    })
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered])

  return (
    <Spinner>
      <div className='lds-dual-ring' />
    </Spinner>
  )
}
