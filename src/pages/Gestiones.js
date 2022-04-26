import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import * as Io from 'react-icons/io'
import * as Ai from 'react-icons/ai'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'
import { Input, GroupButtons } from '../components/Elements/Inputs'
import { ButtonOnInput, ButtonIconAlone, ButtonSecondary } from '../components/Elements/Buttons'
// import { FileComponent } from '../components/Files/Files'
import NumberFormat from 'react-number-format'
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
import { Accordion, Card, useAccordionButton, Modal, Button } from 'react-bootstrap'
import Reporte from '../components/Report'

const Content = styled.div`
  width: 100%;
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
  height: 100%;
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
  // eslint-disable-next-line
  const [nit, setNit] = useState({
    type: 'nit',
    emailNit: '',
    passwordNit: ''
  })
  const [checkState, setCheckState] = useState({
    penales: false,
    policiales: false,
    nit: false,
    agenciaVirtual: false
  })
  const [dataClientReport, setDataClientReport] = useState({})
  const [show, setShow] = useState(false)

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
              <input type='text' name='names' onChange={handleOnChange} value={dataClient.names} />
            </Input>
            <GridInputs>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('lastNames')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Apellidos</label>
                  <input type='text' name='lastNames' onChange={handleOnChange} value={dataClient.lastNames} />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('phone')}><Io.IoMdCopy /></button>
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
                    <button onClick={() => handleOnCopy('dateBirthday')}><Io.IoMdCopy /></button>
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
                    <button onClick={() => handleOnCopy('direction')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Dirección Domiciliar</label>
                  <input type='text' name='direction' onChange={handleOnChange} value={dataClient.direction} />
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
                    value={dataClient.cui}
                    onValueChange={(e) => handleOnChange(e, 'cui')}
                    format='#### ##### ####'
                    allowEmptyFormatting
                    mask='-'
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button onClick={() => handleOnCopy('nit')}><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>NIT</label>
                  <input type='text' name='nit' onChange={handleOnChange} style={{ textTransform: 'uppercase' }} value={dataClient.nit} />
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
                  <input tyep='email' name='email' onChange={handleOnChange} value={dataClient.email} />
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
                          <button onClick={() => { setPenales({ ...penales, emailPenales: dataClient.email }) }}><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('emailPenales', 'penales')}><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Correo Electrónico</label>
                        <input tyep='email' value={penales.emailPenales} name='emailPenales' onChange={handleOnChangePenales} />
                      </Input>
                      <Input>
                        <GroupButtons>
                          <button onClick={() => { setPenales({ ...penales, passwordPenales: dataClient.password }) }}><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('passwordPenales', 'penales')}><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Contraseña</label>
                        <input type='password' value={penales.passwordPenales} name='passwordPenales' onChange={handleOnChangePenales} />
                        <ButtonOnInput>
                          <Ai.AiFillEyeInvisible />
                        </ButtonOnInput>
                      </Input>
                    </div>
                    <div>
                      <ButtonSecondary>Generar Reporte</ButtonSecondary>
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
                          <button onClick={() => { setPoliciales({ ...policiales, emailPoliciales: dataClient.email }) }}><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('emailPoliciales', 'policiales')}><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Correo Electrónico</label>
                        <input tyep='email' name='emailPoliciales' value={policiales.emailPoliciales} onChange={handleOnChangePoliciales} />
                      </Input>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={() => { setPoliciales({ ...policiales, passwordPoliciales: dataClient.password }) }}><Io.IoMdSync /></button>
                          <button onClick={() => handleOnCopy('passwordPoliciales', 'policiales')}><Io.IoMdCopy /></button>
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
                          <button onClick={() => handleOnCopy('place', 'policiales')}><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Lugar</label>
                        <input type='text' name='place' value={policiales.place} onChange={handleOnChangePoliciales} />
                      </Input>
                      <Input marginBottom='15px'>
                        <GroupButtons>
                          <button onClick={GenerateFlix}><Ai.AiOutlineReload /></button>
                          <button onClick={() => handleOnCopy('flix', 'policiales')}><Io.IoMdCopy /></button>
                        </GroupButtons>
                        <label>Pelicula</label>
                        <input type='text' name='flix' value={policiales.flix} onChange={handleOnChangePoliciales} />
                      </Input>
                    </div>
                    <div>
                      <ButtonSecondary>Generar Reporte</ButtonSecondary>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ContentGestionesDocs>
        <Button className='me-2 mb-2' onClick={handleShow}>
          Full screen
        </Button>
        {
          show ? <ShowModalReport show={show} onSetShow={setShow} data={dataClientReport} /> : ''
        }
      </Content>
    </Sidebar>
  )
}
