import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import * as Io from 'react-icons/io'
import * as Ai from 'react-icons/ai'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'
import { Input, GroupButtons } from '../components/Elements/Inputs'
import { ButtonOnInput, ButtonIconAlone } from '../components/Elements/Buttons'
import { FileComponent } from '../components/Files/Files'
import NumberFormat from 'react-number-format'
import { v4 as uuidv4 } from 'uuid'
// Hooks
import { useState, useEffect } from 'react'

// Toast
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Utils
import { removeAccents } from '../Utils/TextFormat'

const Content = styled.div`
  width: 100%;
  padding: 2em;
`

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const ContentBody = styled.div`
`

const ContentSpaceGestion = styled.div`
  padding: 2em;
  background-color: #232323;
  width: 50%;
  height: 100%;
  border-radius: 1em;
`
const GroupGridContentDouble = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 0.8fr;
`

const GridInputs = styled.div`
  display: grid;
  grid-gap: 15px;

  & ${GroupGridContentDouble}:nth-child(even) {
    grid-template-columns: 0.8fr 1fr;
  }
`

const LayoutUpload = styled.div`
  width: 100%;
  height: 14rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Upload = styled.div`
  width: 100%;
  padding: 20px;
  border: 2px dashed #FF5F00;
  background-color: #171717;
  border-radius: 1em;
`

const ContentFiles = styled.div`
  padding: 0 0 0 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  align-content: center;
`

const GroupButtonsHeaderActions = styled.div`
  display: flex;
  gap: 15px;

  & button{
    font-size: 1.4em;
    padding: 5px 12px;
  }
`

export default function Gestiones () {
  const [dataClient, setDataClient] = useState({
    id: uuidv4(),
    names: '',
    lastNames: '',
    phone: '',
    cui: '',
    dateBirthday: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    console.log('Cambio el estado')
  }, [])

  function handleOnChange (e, label = '') {
    const data = { ...dataClient }

    if (label !== '') {
      const jsonFormat = e
      if (label === 'phone') {
        data.phone = jsonFormat.value
      }

      if (label === 'cui') {
        data.cui = jsonFormat.value
      }
      setDataClient(data)
      return
    }

    if (e.target.name === 'names') {
      data.names = e.target.value
    }
    if (e.target.name === 'lastNames') {
      data.lastNames = e.target.value
    }
    if (e.target.name === 'cui') {
      data.cui = e.target.value
    }
    if (e.target.name === 'dateBirthday') {
      data.dateBirthday = e.target.value
    }
    if (e.target.name === 'email') {
      data.email = e.target.value
    }
    if (e.target.name === 'password') {
      data.password = e.target.value
    }
    setDataClient(data)
  }

  // function handleOnSubmit () {}
  function handleOnCopy (textCopy) {
    const text = dataClient[textCopy]
    navigator.clipboard.writeText(text)
    // Colocar un toast de que se copio el texto
    // https://fkhadra.github.io/react-toastify/installation
    // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    toast.success('Se copio al portapapeles', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })

    console.log('Texto Copiado')
  }

  function GenerateMail () {
    const data = { ...dataClient }

    let emailGenerate = ''
    const dataName = dataClient.names.replace(/ /g, '').toLowerCase()
    const dataLastName = dataClient.lastNames.replace(/ /g, '').toLowerCase()
    const emailFormat = removeAccents(`${dataName}${dataLastName}@gmail.com`)
    emailGenerate = emailFormat

    data.email = emailGenerate
    setDataClient(data)
    // Email
    // Geovanny Gil
    // geovannygil@gmail.com
    // geovannygil
    // Contraseña
    // 4 digitos de cui
    // @
    // primer nombre, mayuscula la primera letra
  }

  function GeneratePassword () {
    const data = { ...dataClient }

    let passwordGenerate = ''
    const dataCui = dataClient.cui.slice(0, 4)
    let firstName = dataClient.names.split(' ')[0]
    firstName = removeAccents(firstName)
    const passwordFormat = `${dataCui}@${firstName}`
    passwordGenerate = passwordFormat

    data.password = passwordGenerate
    setDataClient(data)
    // Contraseña
    // 4 digitos de cui
    // @
    // primer nombre, mayuscula la primera letra
  }

  return (
    <Sidebar>
      <Content>
        <ContentSpaceGestion>
          <ContentHeader>
            <TitleMultiColor textNormal='Crear' textColorized='Gestiones.' />
            <GroupButtonsHeaderActions>
              <ButtonIconAlone>
                <Io.IoMdShare />
              </ButtonIconAlone>
              <ButtonIconAlone>
                <Io.IoMdSave />
              </ButtonIconAlone>
            </GroupButtonsHeaderActions>
          </ContentHeader>
          <ContentBody>
            <TextIndicador text='Datos Generales' my='10px' />
            <Input marginBottom='15px'>
              <GroupButtons>
                <button onClick={() => handleOnCopy('names')}><Io.IoMdCopy /></button>
              </GroupButtons>
              <label>Nombres</label>
              <input type='text' name='names' onChange={handleOnChange} />
            </Input>
            <GridInputs>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('lastNames')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Apellidos</label>
                  <input type='text' name='lastNames' onChange={handleOnChange} />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('phone')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Teléfono</label>
                  <NumberFormat
                    type='text'
                    name='phone'
                    onValueChange={(e) => handleOnChange(e, 'phone')}
                    format='+(502) ####-####'
                    allowEmptyFormatting
                    mask='_'
                  />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('cui')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>CUI</label>
                  <NumberFormat
                    type='text'
                    name='cui'
                    onValueChange={(e) => handleOnChange(e, 'cui')}
                    format='#### ##### ####'
                    allowEmptyFormatting
                    mask='-'
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('dateBirthday')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Fecha de nacimiento</label>
                  <NumberFormat
                    type='text'
                    name='dateBirthday'
                    onChange={handleOnChange}
                    format='##/##/####'
                    allowEmptyFormatting
                    mask={['d', 'd', 'M', 'M', 'y', 'y', 'y', 'y']}
                  />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button><Ai.AiFillCheckCircle /></button>
                    <button onClick={GenerateMail}><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('email')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Correo Electrónico</label>
                  <input tyep='email' value={dataClient.email} name='email' onChange={handleOnChange} />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={GeneratePassword}><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('password')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Contraseña</label>
                  <input value={dataClient.password} type='password' name='password' onChange={handleOnChange} />
                  <ButtonOnInput>
                    <Ai.AiFillEyeInvisible />
                  </ButtonOnInput>
                </Input>
              </GroupGridContentDouble>
            </GridInputs>
            <TextIndicador text='Archivos Adjuntos' my='15px' />
            <LayoutUpload>
              <Upload />
              <ContentFiles>
                <FileComponent />
                <FileComponent />
              </ContentFiles>
            </LayoutUpload>
          </ContentBody>
        </ContentSpaceGestion>
      </Content>
    </Sidebar>
  )
}
