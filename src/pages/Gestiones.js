import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import * as Io from 'react-icons/io'
import * as Ai from 'react-icons/ai'
import * as Hi from 'react-icons/hi'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'
import { Input, TextArea } from '../components/Elements/Inputs'
import { ButtonOnInput, ButtonIconAlone, ButtonSecondary, GroupButtons } from '../components/Elements/Buttons'
// import { FileComponent } from '../components/Files/Files'
import NumberFormat from 'react-number-format'
import ReactTooltip from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'

// SERVICES
import { dataMovies } from '../services/movies'
import { placesData } from '../services/places'

// Hooks
import { useState, useEffect } from 'react'

// Toast
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Utils
import { removeAccents } from '../Utils/TextFormat'
import randomNumb from '../Utils/randomNumber'

// ACORDEON
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, useAccordionButton, Modal } from 'react-bootstrap'
import Reporte from '../components/Report'

const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2em;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 50% 50%;
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
  height: fit-content;
  border-radius: 1em;
`
const ContentGestionesDocs = styled.div`
  padding: 0 2em;
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
    password: ''
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
  const [nit, setNit] = useState({
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
  const [dataClientReport, setDataClientReport] = useState({})
  const [show, setShow] = useState(false)
  const [stateSave, setStateSave] = useState(false)

  function generateDateForReport () {
    const data = {}
    data.names = dataClient.names
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
    console.log(data)
    setDataClientReport(data)
  }

  function handleShow () {
    generateDateForReport()
    setShow(true)
  }

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
    const data = { ...nit }
    data[e.target.name] = e.target.value
    setNit(data)
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
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!')
    )

    return (
      <button
        type='button'
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    )
  }

  function handleOnSaveData () {
    setStateSave(true)
  }

  return (
    <Sidebar>
      <Content>
        <ContentSpaceGestion>
          <ContentHeader>
            <TitleMultiColor textNormal='Crear' textColorized='Gestiones.' />
            <GroupButtonsHeaderActions>
              <ButtonIconAlone disabled={!stateSave} onClick={handleShow}>
                <Hi.HiDocumentDownload />
              </ButtonIconAlone>
              <ButtonIconAlone disabled={!stateSave}>
                <Io.IoMdShare />
              </ButtonIconAlone>
              <ButtonIconAlone data-tip data-for='saveData' onClick={handleOnSaveData}>
                <Io.IoMdSave />
              </ButtonIconAlone>
            </GroupButtonsHeaderActions>
          </ContentHeader>
          {/* TOOLTIPS */}
          <ReactTooltip place='top' id='membresia' type='dark' effect='solid'>
            <span>Esta función require una membresía</span>
          </ReactTooltip>
          <ReactTooltip place='top' id='saveData' type='dark' effect='solid'>
            <span>Guardar datos del cliente</span>
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
            <TextIndicador text='Datos Generales' my='10px' />
            <Input marginBottom='15px'>
              <GroupButtons>
                <button onClick={() => handleOnCopy('names')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
              </GroupButtons>
              <label>Nombres</label>
              <input type='text' name='names' onChange={handleOnChange} value={dataClient.names} />
            </Input>
            <GridInputs>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('lastNames')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Apellidos</label>
                  <input type='text' name='lastNames' onChange={handleOnChange} value={dataClient.lastNames} />
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
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('direction')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Dirección Domiciliar</label>
                  <input type='text' name='direction' onChange={handleOnChange} value={dataClient.direction} />
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
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('nit')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>NIT</label>
                  <input type='text' name='nit' onChange={handleOnChange} style={{ textTransform: 'uppercase' }} value={dataClient.nit} />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button><Ai.AiFillCheckCircle /></button>
                    <button onClick={GenerateMail} data-tip data-for='generateEmail'><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('email')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Correo Electrónico</label>
                  <input tyep='email' name='email' onChange={handleOnChange} value={dataClient.email} />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={GeneratePassword} data-tip data-for='generatePassword'><Ai.AiOutlineReload /></button>
                    <button onClick={() => handleOnCopy('password')} data-tip data-for='copyTooltip'><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Contraseña</label>
                  <input value={dataClient.password} type='password' name='password' onChange={handleOnChange} />
                  <ButtonOnInput>
                    <Ai.AiFillEyeInvisible />
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
                  <label htmlFor='penales' />
                </div>
                <CustomToggle eventKey='0'>Antecedentes Penales</CustomToggle>
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
                        <input type='password' value={penales.passwordPenales} name='passwordPenales' onChange={handleOnChangePenales} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible />
                        </ButtonOnInput>
                      </Input>
                    </div>
                    <div>
                      <ButtonSecondary data-tip data-for='membresia'>Subir Archivo</ButtonSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='policiales' name='policiales' checked={checkState.policiales} value='policiales' onChange={checkGestion} />
                  <label htmlFor='policiales' />
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
                        <input type='password' name='passwordPoliciales' value={policiales.passwordPoliciales} onChange={handleOnChangePoliciales} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible />
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
                      <ButtonSecondary data-tip data-for='membresia'>Subir Archivo</ButtonSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='gestionNit' name='gestionNit' checked={checkState.gestionNit} value='gestionNit' onChange={checkGestion} />
                  <label htmlFor='gestionNit' />
                </div>
                <CustomToggle eventKey='2'>NIT</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='2'>
                <Card.Body>
                  <div className='contentGestion'>
                    <div>
                      <TextArea placeholder='Datos adicionales de la creación del nit' name='otherData' value={nit.otherData} onChange={handleOnChangeNit} />
                    </div>
                    <div>
                      <ButtonSecondary data-tip data-for='membresia'>Subir Archivo</ButtonSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className='round'>
                  <input type='checkbox' id='agenciaVirtual' name='agenciaVirtual' checked={checkState.agenciaVirtual} value='agenciaVirtual' onChange={checkGestion} />
                  <label htmlFor='agenciaVirtual' />
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
                        <input type='password' value={agenciaVirtual.passwordAgencia} name='passwordAgencia' onChange={handleOnAgenciaVirtual} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible />
                        </ButtonOnInput>
                      </Input>
                    </div>
                    <div>
                      <ButtonSecondary data-tip data-for='membresia'>Subir Archivo</ButtonSecondary>
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
