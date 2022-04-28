import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRef, useState } from 'react'
import { auth } from '../services/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import styled from 'styled-components'
import bgDesktopLogin from '../assets/img/background-login.jpg'
import bgResponsiveLogin from '../assets/img/bg-responsive-dark.jpg'
import logoGestiones from '../assets/img/Gestiones.svg'
import { Input } from '../components/Elements/Inputs'
import { ButtonOnInput, ButtonPrimary } from '../components/Elements/Buttons'
import * as Ai from 'react-icons/ai'

const ContentLogin = styled.main`
  background-image: url(${bgResponsiveLogin});
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  position: relative;
  align-items: center;
  justify-items: center;
  align-content: center;

  @media (min-width: 942px) {
    justify-items: start;
    background-position: center center;
    background-image: url(${bgDesktopLogin});
  }
`

const ContentLoginForm = styled.div`
    margin: 0 2em 0 2em;
  @media (min-width: 942px) {
    margin: 0 5em 0 5em;
    width: 50%;
  }
  @media (min-width: 1240px) {
    width: 35%;
  }
  @media (min-width: 1320px) {
    width: 30%;
  }
`

const InputLogin = styled(Input)`
  background-color: #232323;
  margin-bottom: 0.7em;
  padding: 8px 15px;

  @media (min-width: 942px) {
    padding: initial;
    margin-bottom: 1em;
    padding: 10px 15px;
  }

  @media (min-width: 1240px) {
    padding: 15px;
  }
`
const Logo = styled.img`
  margin-bottom: 4em;
  @media (min-width: 942px) {
    position: absolute;
    top: 5%;
    left: 4%;
  }
`

const TitleLogin = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    font-weight: 700;
    margin-bottom: 0.6em;
  & span{
    color: #FF5F00;
  }

  @media (min-width: 942px) {
    text-align: left;
    font-size: 4rem;
  }
`
const ContactSupport = styled.span`
    display: block;
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 1.5em;
    display: none;
    text-align: center;
    margin-top: 2em;
  & a{
    color: #FF5F00;
  }

  &.lcs2ar{
    display: block;
  }

  @media (min-width: 942px) {
    text-align: left;
    font-size: 1.3rem;
    display: block;
    &.lcs2ar{
      display: none;
    }
  }
`
const ButtonPrimaryLogin = styled(ButtonPrimary)`
  padding: 0.5em 0;
`

const ErrorMessage = styled.div`
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  padding: 0.7em;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1em;
`

export default function LoginView () {
  const navigate = useNavigate()
  // const [currentUser, setCurrentUser] = useState(null)

  /*
    STATE
    0: INICIALIZADO
    1: CARGANDO
    2: LOGIN COMPLETO
    3: LOGIN PERO SIN REGISTRO
    4: NO HAY NADIE LOGUEADO
    5: YA EXISTE USERNAME
    6: CLICK PARA CONTINUAR WELCOME
  */

  const [state, setCurrentState] = useState(0)
  const [error, setError] = useState('')
  const [viewPassword, setViewPassword] = useState('password')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleOnClickSignIn = async (e) => {
    try {
      e.preventDefault()
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(res => {
        // console.log(res)
      }).catch(err => {
        if (err.code === 'auth/invalid-email') {
          setError('El correo no es válido')
        }
        if (err.code === 'auth/user-not-found') {
          setError('El correo no existe')
        }
        if (err.code === 'auth/wrong-password') {
          setError('La contraseña es incorrecta')
        }
      })
    } catch (error) {
      // console.log(error)
    }
  }

  const handleUserLoggedIn = (user) => {
    navigate('/clients')
  }
  const handleUserNotRegistered = (user) => {
    navigate('/welcome')
  }
  const handleUserNotLoggedIn = () => {
    setCurrentState(4)
  }

  if (state === 1) {
    return <div>Loading...</div>
  }
  if (state === 2) {
    return <div>Estas autenticado y registrado</div>
  }
  if (state === 3) {
    return <div>Estas autenticado pero no registrado...</div>
  }

  function handleViewPassword () {
    if (viewPassword === 'password') {
      setViewPassword('text')
    } else {
      setViewPassword('password')
    }
  }

  if (state === 4) {
    return (
      <ContentLogin>
        <Logo src={logoGestiones} />
        <ContentLoginForm>
          <form onSubmit={handleOnClickSignIn}>
            <TitleLogin>Iniciar Sesión<span>.</span></TitleLogin>
            <ContactSupport>Contactarme a <a href='/signup'> soporte técnico</a></ContactSupport>
            {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
            <InputLogin>
              <label>Correo Electrónico</label>
              <input ref={emailRef} type='email' />
            </InputLogin>
            <InputLogin>
              <label>Contraseña</label>
              <input type={viewPassword} ref={passwordRef} />
              <ButtonOnInput onClick={handleViewPassword}>
                <Ai.AiFillEyeInvisible />
              </ButtonOnInput>
            </InputLogin>
            <ButtonPrimaryLogin onClick={handleOnClickSignIn}>
              Iniciar Sesión
            </ButtonPrimaryLogin>
            <ContactSupport className='lcs2ar'>Contactarme a <a href='/signup'> soporte técnico</a></ContactSupport>
          </form>

          {/* <form action=''>
            <h1>Signin</h1>
            <input type='email' placeholder='Email' ref={emailRef} />
            <input type='password' placeholder='password' ref={passwordRef} />
            <button type='submit' onClick={handleOnClickSignIn}>Signin</button>
          </form> */}
        </ContentLoginForm>
      </ContentLogin>
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
