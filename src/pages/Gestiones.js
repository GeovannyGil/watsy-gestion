import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import * as Io from 'react-icons/io'
import * as Ai from 'react-icons/ai'
import * as Hi from 'react-icons/hi'
import * as Bi from 'react-icons/bi'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'
import { Input, InputSelect, TextArea } from '../components/Elements/Inputs'
import { ButtonOnInput, ButtonLinkIconSecondary, ButtonIconAlone, GroupButtons } from '../components/Elements/Buttons'
// import { FileComponent } from '../components/Files/Files'
import NumberFormat from 'react-number-format'
import ReactTooltip from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { format, setGlobalDateMasks } from 'fecha'
import swal from 'sweetalert'

// SERVICES
import { dataMovies } from '../services/movies'
import { placesData } from '../services/places'
import { insertNewClient, updateClient as updateClientFirestore, deleteClient as deleteClientFirestore, getClientInfo } from '../services/firebase/firebase'

// Hooks
import { useState, useEffect } from 'react'

// Toast
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Utils
import { removeAccents } from '../Utils/TextFormat'
import randomNumb from '../Utils/randomNumber'
import axios from 'axios'

// ACORDEON
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, useAccordionButton, Modal } from 'react-bootstrap'
import Reporte from '../components/Report'
import AuthProvider from '../components/AuthProvider'

const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2em;
  display: grid;
  grid-gap: 1em;


  @media (min-width: 1280px) {
    grid-template-columns: 65% 35%;
  }

  @media (min-width: 1920px) {
    grid-template-columns: 50% 50%;
    grid-gap: 2em;
  }

`
const ContentHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;

  @media (min-width: 720px) {
    justify-content: space-between;
    flex-direction: row;
  }
`
const ContentBody = styled.div`
`
const ContentSpaceGestion = styled.div`
  padding: 2em;
  background-color: #232323;
  height: fit-content;
  border-radius: 1em;
  @media (min-width: 1280px) {
    grid-gap: 0.2em;
  }

`
const ContentGestionesDocs = styled.div`
  height: 100%;
  border-radius: 1em;
  @media (min-width: 1280px) {
     padding: 0 1em;
  }
`
const GroupGridContentDouble = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 0.8fr;
`
const GridInputs = styled.div`
  display: grid;
  grid-gap: 15px;

  & ${GroupGridContentDouble}{
    grid-template-columns: 1fr;
  }

   @media (min-width: 1280px) {
    & ${GroupGridContentDouble}:nth-child(odd) {
      grid-template-columns: 0.8fr 1fr;
    }
    & ${GroupGridContentDouble}:nth-child(even) {
      grid-template-columns: 1fr 0.8fr ;
    }
  }

   @media (min-width: 1920px) {
      & ${GroupGridContentDouble}:nth-child(odd) {
      grid-template-columns: 1fr 0.8fr;
    }
    & ${GroupGridContentDouble}:nth-child(even) {
      grid-template-columns: 0.8fr 1fr;
    }
  }

`
// const LayoutUpload = styled.div`
//   width: 100%;
//   height: 14rem;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
// `

// const Upload = styled.div`
//   width: 100%;
//   padding: 20px;
//   border: 2px dashed #FF5F00;
//   background-color: #171717;
//   border-radius: 1em;
// `

// const ContentFiles = styled.div`
//   padding: 0 0 0 20px;
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-gap: 15px;
//   align-content: center;
// `

const GroupButtonsHeaderActions = styled.div`
  display: flex;
  gap: 15px;

  & button{
    font-size: 1.4em;
    padding: 5px 12px;
  }
`

setGlobalDateMasks({
  myMaskComplete: 'DD/MM/YYYY HH:mm A'
})

function ShowModalReport ({ show, onSetShow, data }) {
  return (
    <Modal show={show} fullscreen onHide={() => onSetShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Reporte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Reporte dataClientReport={data} />
      </Modal.Body>
    </Modal>
  )
}

export default function Gestiones () {
  const [dataClient, setDataClient] = useState({
    id: uuidv4(),
    names: '',
    lastNames: '',
    phone: '',
    cui: '',
    nit: '',
    direction: '',
    dateBirthday: '',
    email: '',
    password: '',
    state: 'Sin Pendientes'
  })
  const [penales, setPenales] = useState({
    type: 'penales',
    emailPenales: '',
    passwordPenales: ''
  })
  const [policiales, setPoliciales] = useState({
    type: 'policiales',
    emailPoliciales: '',
    passwordPoliciales: '',
    place: '',
    flix: ''
  })
  const [nitSevice, setNitService] = useState({
    type: 'nit',
    otherData: ''
  })
  const [agenciaVirtual, setAgenciaVirtual] = useState({
    type: 'agenciaVirtual',
    emailAgencia: '',
    passwordAgencia: ''
  })
  const [otherService, setOtherService] = useState({
    type: 'otherService',
    otherService: ''
  })
  const [checkState, setCheckState] = useState({
    penales: false,
    policiales: false,
    gestionNit: false,
    agenciaVirtual: false
  })
  const [showPassword, setShowPassword] = useState({
    general: 'password',
    penales: 'password',
    policiales: 'password',
    agenciaVirtual: 'password'
  })
  const [dataClientReport, setDataClientReport] = useState({})
  const [show, setShow] = useState(false)
  const [stateSave, setStateSave] = useState(false)
  // eslint-disable-next-line
  const [stateUpdate, setStateUpdate] = useState(false)
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({})
  const [state, setState] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

  function generateDateForReport () {
    const data = {}
    data.names = dataClient.names
    data.codeClient = dataClient.docId.slice(0, 8)
    data.lastNames = dataClient.lastNames
    data.phone = `${dataClient.phone.slice(0, 4)}-${dataClient.phone.slice(4, 8)}`
    data.email = dataClient.email
    data.password = dataClient.password
    data.gestiones = { ...checkState }
    data.nit = dataClient.nit
    data.penales = {
      email: penales.emailPenales,
      password: penales.passwordPenales
    }
    data.policiales = {
      cui: dataClient.cui,
      password: policiales.passwordPoliciales
    }
    data.agenciaVirtual = {
      email: agenciaVirtual.emailAgencia,
      password: agenciaVirtual.passwordAgencia
    }
    // console.log(data)
    setDataClientReport(data)
  }

  function handleShow () {
    // if (checkState.penales === false && checkState.policiales === false && checkState.gestionNit === false && checkState.agenciaVirtual === false) {
    //   toast.error('Seleccione al menos una gestíón para generar el reporte', {
    //     position: 'bottom-center',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'dark'
    //   })
    //   return
    // }
    generateDateForReport()
    setShow(true)
  }

  useEffect(() => {
    async function fetchData () {
      const res = await getClientInfo(params.docId)
      if (res === false) {
        // console.log('No se encontro el cliente')
        return
      }
      const data = { ...res }
      data.docId = params.docId
      setStateSave(true)
      setDataClient({ ...data })
      setPenales({ ...data.penales })
      setPoliciales({ ...data.policiales })
      setNitService({ ...data.nitService })
      setAgenciaVirtual({ ...data.agenciaVirtual })
      setOtherService({ ...data.otherService })
      setCheckState({ ...data.activeServices })
      setStateUpdate(true)
    }
    if (params?.docId) {
      fetchData()
    }
  }, [params.docId])

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

    if (e.target.name === 'nit') {
      data.nit = e.target.value.toUpperCase()
      setDataClient(data)
      return
    }

    data[e.target.name] = e.target.value
    setDataClient(data)
  }

  function handleOnChangePenales (e) {
    const data = { ...penales }
    data[e.target.name] = e.target.value
    setPenales(data)
  }

  function handleOnChangePoliciales (e) {
    const data = { ...policiales }
    data[e.target.name] = e.target.value
    setPoliciales(data)
  }

  function handleOnChangeNit (e) {
    const data = { ...nitSevice }
    data[e.target.name] = e.target.value
    setNitService(data)
  }

  function handleOnOtherService (e) {
    const data = { ...otherService }
    data[e.target.name] = e.target.value
    setOtherService(data)
  }

  function handleOnAgenciaVirtual (e) {
    const data = { ...agenciaVirtual }
    data[e.target.name] = e.target.value
    setAgenciaVirtual(data)
  }
  // function handleOnSubmit () {}
  function handleOnCopy (textCopy, gestion = '') {
    let text = ''
    if (gestion === '') {
      text = dataClient[textCopy]
    } else {
      if (gestion === 'penales') {
        text = penales[textCopy]
      }
      if (gestion === 'policiales') {
        text = policiales[textCopy]
      }
      if (gestion === 'agenciaVirtual') {
        text = agenciaVirtual[textCopy]
      }
    }
    navigator.clipboard.writeText(text)
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
  }

  function GenerateFlix () {
    const data = { ...policiales }
    const flix = dataMovies[randomNumb(0, dataMovies.length - 1)]
    data.flix = flix
    setPoliciales(data)
  }

  function GeneratePlace () {
    const data = { ...policiales }
    const place = placesData[randomNumb(0, dataMovies.length - 1)]
    data.place = place
    setPoliciales(data)
  }

  function checkGestion (e) {
    const dataCheck = { ...checkState }
    dataCheck[e.target.name] = e.target.checked
    setCheckState(dataCheck)
  }

  function CustomToggle ({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey)

    return (
      <button
        type='button'
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    )
  }

  function generateDataClientComplete () {
    if (dataClient.names === '' || dataClient.lastNames === '') {
      toast.error('El nombre y el apellido no pueden estar vacios', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      return
    }
    const data = { ...dataClient }
    data.penales = { ...penales }
    data.policiales = { ...policiales }
    data.nitService = { ...nitSevice }
    data.otherService = { ...otherService }
    data.agenciaVirtual = { ...agenciaVirtual }
    data.activeServices = { ...checkState }
    data.createdAt = format(new Date(), 'myMaskComplete')
    return data
  }

  async function handleOnSaveData () {
    addClient()
  }

  async function addClient () {
    const data = generateDataClientComplete()
    const res = await insertNewClient(data)
    swal('Datos guardados correctamente', {
      icon: 'success',
      buttons: {
        confirm: {
          text: 'Aceptar',
          value: true,
          visible: true,
          className: 'swal-button--confirm-watsy'
        }
      }
    })
    data.docId = res.id
    setDataClient({ ...data })
    setStateSave(true)
    // console.log('Registrando cliente')
  }

  async function handleOnUpdateData () {
    const data = generateDataClientComplete()
    updateClient(dataClient.docId, data)
  }

  async function updateClient (docId, data) {
    try {
      await updateClientFirestore(docId, data)
      toast.success('Se actualizo los datos del cliente correctamente', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } catch (error) {
      // console.log(error)
    }
  }

  function handleOnDeleteData () {
    swal({
      title: 'Deseas eliminar al cliente?',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          value: null,
          visible: true
        },
        confirm: {
          text: 'Aceptar',
          value: true,
          visible: true
        }
      },
      dangerMode: true,
      text: 'Si eliminas al cliente no podras recuperarlo'
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteClient(dataClient.docId)
          swal('El cliente se elimino correctamente', {
            icon: 'success',
            buttons: {
              confirm: {
                text: 'Aceptar',
                value: true,
                visible: true,
                className: 'swal-button--confirm-watsy'
              }
            }
          })
        }
      })
  }

  async function deleteClient (docId) {
    try {
      await deleteClientFirestore(docId)
      navigate('/clients')
    } catch (error) {
      console.error(error)
    }
  }
  const handleUserLoggedIn = (user) => {
    setCurrentUser(user)
    setState(2)
  }

  const handleUserNotRegistered = (user) => {
    navigate('/login')
  }

  const handleUserNotLoggedIn = () => {
    navigate('/login')
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_DOMAIN}/gestiones/${dataClient.docId}`)
    toast.success('Se copio el link de la gestión', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
  }

  async function validateEmail () {
    // Validate Email Mailboxer
    await axios.get('http://apilayer.net/api/check', {
      params: {
        access_key: process.env.REACT_APP_API_KEY_MAILBOXER,
        email: dataClient.email,
        smtp: 1,
        format: 1
      }
    }).then(response => {
      if (response.data.smtp_check === false) {
        toast.success('El correo no existe',
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
      } else {
        toast.error('El correo ya existe',
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
      }
    })
  }

  function handleViewPassword (input) {
    let type = showPassword[input]

    if (type === 'password') {
      type = 'text'
    } else {
      type = 'password'
    }

    setShowPassword({ ...showPassword, [input]: type })
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      />
    )
  }

  return (
    <Sidebar>
      <Content>
        <ContentSpaceGestion>
          <ContentHeader>
            {
              !stateSave
                ? <TitleMultiColor textNormal='Crear ' textColorized='Gestión.' />
                : <TitleMultiColor textNormal='Generar ' textColorized='Gestión.' />
            }
            <GroupButtonsHeaderActions>
              <ButtonIconAlone disabled={!stateSave} onClick={handleShow} data-tip data-for='report' tabIndex='1'>
                <Hi.HiDocumentDownload />
              </ButtonIconAlone>
              <ButtonIconAlone disabled={!stateSave} data-tip data-for='copyLink' onClick={handleCopyLink} tabIndex='2'>
                <Io.IoMdLink />
              </ButtonIconAlone>
              {
                !stateSave && (
                  <ButtonIconAlone data-tip data-for='saveData' onClick={handleOnSaveData} tabIndex='3'>
                    <Io.IoMdSave />
                  </ButtonIconAlone>
                )
              }
              {
                stateSave && (
                  <ButtonIconAlone data-tip data-for='deleteData' onClick={handleOnDeleteData} tabIndex='4'>
                    <Io.IoMdTrash />
                  </ButtonIconAlone>
                )
              }
              {
                stateSave && (
                  <ButtonIconAlone data-tip data-for='updateData' onClick={handleOnUpdateData} tabIndex='5'>
                    <Ai.AiFillEdit />
                  </ButtonIconAlone>
                )
              }
            </GroupButtonsHeaderActions>
          </ContentHeader>
          {/* TOOLTIPS */}
          <ReactTooltip place='top' id='verifyEmail' type='dark' effect='solid'>
            <span>Verificar si existe el correo</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='report' type='dark' effect='solid'>
            <span>Generar reporte</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='copyLink' type='dark' effect='solid'>
            <span>Copiar link de la gestión</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='membresia' type='dark' effect='solid'>
            <span>Esta función require una membresía</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='link' type='dark' effect='solid'>
            <span>Presiona para ir al sitio web</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='saveData' type='dark' effect='solid'>
            <span>Guardar datos del cliente</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='deleteData' type='dark' effect='solid'>
            <span>Eliminar cliente</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='activeGestion' type='dark' effect='solid'>
            <span>Activar gestión para reporte</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='updateData' type='dark' effect='solid'>
            <span>Actualizar datos del cliente</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='copyTooltip' type='dark' effect='solid'>
            <span>Copiar al portapapeles</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='generateEmail' type='dark' effect='solid'>
            <span>Generar correo</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='generatePassword' type='dark' effect='solid'>
            <span>Generar contraseña</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='syncEmail' type='dark' effect='solid'>
            <span>Sincronizar con correo electrónico</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='syncPassword' type='dark' effect='solid'>
            <span>Sincronizar con contraseña maestra</span>
          </ReactTooltip>
          {/* TOOLTIPS */}
          <ContentBody>
            <TextIndicador text='Datos Generales' my='10px' className='d-flex'>
              <InputSelect>
                <label>Estado</label>
                <select name='state' onChange={handleOnChange} defaultValue={dataClient.state}>
                  {/* eslint-disable-next-line */}
                  <option value='Sin Pendientes'>Sin Pendientes</option>
                  {/* eslint-disable-next-line */}
                  <option value='Pendiente'>Pendiente</option>
                </select>
                <Io.IoMdArrowDropdown className='__Input__select-i-arrow' size='1.5em' />
              </InputSelect>
            </TextIndicador>
            <Input marginBottom='15px'>
              <GroupButtons>
                <button onClick={() => handleOnCopy('names')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
              </GroupButtons>
              <label>Nombres</label>
              <input type='text' name='names' onChange={handleOnChange} value={dataClient.names} tabIndex='6' />
            </Input>
            <GridInputs>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('lastNames')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Apellidos</label>
                  <input type='text' name='lastNames' onChange={handleOnChange} value={dataClient.lastNames} tabIndex='7' />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('phone')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Teléfono</label>
                  <NumberFormat
                    type='text'
                    name='phone'
                    value={dataClient.phone}
                    onValueChange={(e) => handleOnChange(e, 'phone')}
                    format='+(502) ####-####'
                    allowEmptyFormatting
                    mask='_'
                    tabIndex='8'
                  />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('dateBirthday')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Fecha de nacimiento</label>
                  <NumberFormat
                    type='text'
                    value={dataClient.dateBirthday}
                    name='dateBirthday'
                    onChange={handleOnChange}
                    format='##/##/####'
                    allowEmptyFormatting
                    mask={['d', 'd', 'M', 'M', 'y', 'y', 'y', 'y']}
                    tabIndex='9'
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('direction')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Dirección Domiciliar</label>
                  <input type='text' name='direction' onChange={handleOnChange} value={dataClient.direction} tabIndex='10' />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('cui')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>CUI</label>
                  <NumberFormat
                    type='text'
                    name='cui'
                    value={dataClient.cui}
                    onValueChange={(e) => handleOnChange(e, 'cui')}
                    format='#### ##### ####'
                    allowEmptyFormatting
                    mask='-'
                    tabIndex='11'
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('nit')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>NIT</label>
                  <input type='text' name='nit' onChange={handleOnChange} style={{ textTransform: 'uppercase' }} value={dataClient.nit} tabIndex='12' />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={validateEmail} data-tip data-for='verifyEmail'><Ai.AiFillCheckCircle /></button>
                    <button onClick={GenerateMail} data-tip data-for='generateEmail'><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('email')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Correo Electrónico</label>
                  <input tyep='email' name='email' onChange={handleOnChange} value={dataClient.email} tabIndex='13' />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={GeneratePassword} data-tip data-for='generatePassword'><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('password')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Contraseña</label>
                  <input value={dataClient.password} type={showPassword.general} name='password' onChange={handleOnChange} tabIndex='14' />
                  <ButtonOnInput>
                    <Ai.AiFillEyeInvisible onClick={() => handleViewPassword('general')} />
                  </ButtonOnInput>
                </Input>
              </GroupGridContentDouble>
            </GridInputs>
            {/* <TextIndicador text='Archivos Adjuntos' my='15px' />
            <LayoutUpload>
              <Upload />
              <ContentFiles>
                <FileComponent />
                <FileComponent />
              </ContentFiles>
            </LayoutUpload> */}
          </ContentBody>
        </ContentSpaceGestion>
        <ContentGestionesDocs>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='penales' name='penales' checked={checkState.penales} value='penales' onChange={checkGestion} />
                  <label htmlFor='penales' data-tip data-for='activeGestion' />
                </div>
                <CustomToggle eventKey='0' tabIndex='15'>Antecedentes Penales</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <div className='contentGestion'>
                    <div>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={() => { setPenales({ ...penales, emailPenales: dataClient.email }) }} data-tip data-for='syncEmail'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('emailPenales', 'penales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Correo Electrónico</label>
                        <input tyep='email' value={penales.emailPenales} name='emailPenales' onChange={handleOnChangePenales} />
                      </Input>
                      <Input>
                        <GroupButtons>
                          <button onClick={() => { setPenales({ ...penales, passwordPenales: dataClient.password }) }} data-tip data-for='syncPassword'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('passwordPenales', 'penales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Contraseña</label>
                        <input type={showPassword.penales} value={penales.passwordPenales} name='passwordPenales' onChange={handleOnChangePenales} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible onClick={() => handleViewPassword('penales')} />
                        </ButtonOnInput>
                      </Input>
                    </div>
                    <div>
                      <ButtonLinkIconSecondary href='https://portal.oj.gob.gt/oauth/3/login/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Login Antecedentes</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://portal.oj.gob.gt/oauth/registro' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Registrarse Antecedentes</ButtonLinkIconSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='policiales' name='policiales' checked={checkState.policiales} value='policiales' onChange={checkGestion} />
                  <label htmlFor='policiales' data-tip data-for='activeGestion' />
                </div>
                <CustomToggle eventKey='1'>Antecedentes Policiales</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  <div className='contentGestion'>
                    <div>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={() => { setPoliciales({ ...policiales, emailPoliciales: dataClient.email }) }} data-tip data-for='syncEmail'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('emailPoliciales', 'policiales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Correo Electrónico</label>
                        <input tyep='email' name='emailPoliciales' value={policiales.emailPoliciales} onChange={handleOnChangePoliciales} />
                      </Input>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={() => { setPoliciales({ ...policiales, passwordPoliciales: dataClient.password }) }} data-tip data-for='syncPassword'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('passwordPoliciales', 'policiales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Contraseña</label>
                        <input type={showPassword.policiales} name='passwordPoliciales' value={policiales.passwordPoliciales} onChange={handleOnChangePoliciales} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible onClick={() => handleViewPassword('policiales')} />
                        </ButtonOnInput>
                      </Input>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={GeneratePlace}><Ai.AiOutlineReload /></button>
                          <button onClick={() => handleOnCopy('place', 'policiales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Lugar</label>
                        <input type='text' name='place' value={policiales.place} onChange={handleOnChangePoliciales} />
                      </Input>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={GenerateFlix}><Ai.AiOutlineReload /></button>
                          <button onClick={() => handleOnCopy('flix', 'policiales')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Pelicula</label>
                        <input type='text' name='flix' value={policiales.flix} onChange={handleOnChangePoliciales} />
                      </Input>
                    </div>
                    <div>
                      <ButtonLinkIconSecondary href='https://policiales.pnc.gob.gt/login/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Login Policiales</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://policiales.pnc.gob.gt/autoregistro/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Registrarse Policiales</ButtonLinkIconSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='gestionNit' name='gestionNit' checked={checkState.gestionNit} value='gestionNit' onChange={checkGestion} />
                  <label htmlFor='gestionNit' data-tip data-for='activeGestion' />
                </div>
                <CustomToggle eventKey='2'>NIT</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='2'>
                <Card.Body>
                  <div className='contentGestion'>
                    <div>
                      <TextArea placeholder='Datos adicionales de la creación del nit' name='otherData' value={nitSevice.otherData} onChange={handleOnChangeNit} />
                    </div>
                    <div>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/solicitud-electronica-de-nit/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Solicitar NIT</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/consulta-cui-nit/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Consultar CUI/NIT</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/consulta-registro-tributario-unificado/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Impresión de RTU</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> PORTAL SAT</ButtonLinkIconSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='agenciaVirtual' name='agenciaVirtual' checked={checkState.agenciaVirtual} value='agenciaVirtual' onChange={checkGestion} />
                  <label htmlFor='agenciaVirtual' data-tip data-for='activeGestion' />
                </div>
                <CustomToggle eventKey='3'>Agencia Virtual</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='3'>
                <Card.Body>
                  <div className='contentGestion'>
                    <div>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={() => { setAgenciaVirtual({ ...agenciaVirtual, emailAgencia: dataClient.email }) }} data-tip data-for='syncEmail'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('emailAgencia', 'agenciaVirtual')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Correo Electrónico</label>
                        <input tyep='email' value={agenciaVirtual.emailAgencia} name='emailAgencia' onChange={handleOnAgenciaVirtual} />
                      </Input>
                      <Input>
                        <GroupButtons>
                          <button onClick={() => { setAgenciaVirtual({ ...agenciaVirtual, passwordAgencia: dataClient.password }) }} data-tip data-for='syncPassword'><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('passwordAgencia', 'agenciaVirtual')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Contraseña</label>
                        <input type={showPassword.agenciaVirtual} value={agenciaVirtual.passwordAgencia} name='passwordAgencia' onChange={handleOnAgenciaVirtual} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible onClick={() => handleViewPassword('agenciaVirtual')} />
                        </ButtonOnInput>
                      </Input>
                    </div>
                    <div>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/solicitud-usuario-agencia-virtual/#link-agenciavirtual' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> Solicitud de Agencia Virtual</ButtonLinkIconSecondary>
                      <ButtonLinkIconSecondary href='https://portal.sat.gob.gt/portal/' target='_blank' data-tip data-for='link'><Bi.BiLinkExternal /> PORTAL SAT</ButtonLinkIconSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className='d-block'>
                <CustomToggle eventKey='4' className='ml-4'>Otro servicio</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='4'>
                <Card.Body>
                  <div className='contentGestion d-block'>
                    <TextArea placeholder='Datos adicionales del cliente' name='otherService' value={otherService.otherService} onChange={handleOnOtherService} />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ContentGestionesDocs>
        {
          show ? <ShowModalReport show={show} onSetShow={setShow} data={dataClientReport} /> : ''
        }
      </Content>
    </Sidebar>
  )
}
