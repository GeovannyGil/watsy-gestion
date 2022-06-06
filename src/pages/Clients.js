import styled from 'styled-components'
import { useState } from 'react'
import { getClients } from '../services/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import SideBar from '../components/SideBar/Sidebar'
import ItemClient from '../components/ItemClient'
import { TitleMultiColor } from '../components/Elements/Text'
import { ButtonPrimaryIcon } from '../components/Elements/Buttons'
import { Input } from '../components/Elements/Inputs'
import * as Io from 'react-icons/io'

const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2em;
`
const ContentClients = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border-radius: 1em;
  /* background-color: #232323; */
  padding: 2em;

  @media (min-width: 1920px) {
    width: 60%;
  }
`

const ContentClientHead = styled.div`
  display: flex;
  justify-content: space-between;
  & span{
    font-weight: 600;
  }
`

const ContentClientBody = styled.div`
  margin-top: 1em;
`

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  border-bottom: 1px solid #ccc;

  & .icon-search{
    font-size: 1.5em;
  }

  & ${Input}{
    
  }
`

export default function Clients () {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({})
  const [state, setState] = useState(0)
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [clients, setClients] = useState([])
  const [clientsFilter, setClientsFilter] = useState([])

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user)
    setState(2)
    const clients = await getClients()
    setClients([...clients])
    setClientsFilter([...clients])
  }

  const handleUserNotRegistered = (user) => {
    navigate('/login')
  }

  const handleUserNotLoggedIn = () => {
    navigate('/login')
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

  function handleCreateGestion () {
    navigate('/gestiones')
  }

  function handleSearch (e) {
    const q = e.target.value.toLowerCase()

    if (q === '') {
      setClientsFilter([...clients])
    } else {
      const res = clients.filter(x => x.names.toLowerCase().indexOf(q) >= 0 || x.lastNames.toLowerCase().indexOf(q) >= 0 || x.cui.indexOf(q) >= 0)

      if (res.length === 0) {
        setClientsFilter([])
      } else {
        setClientsFilter([...res])
      }
    }
  }

  return (
    <SideBar>
      <Content>
        <ContentClients>
          <ContentClientHead>
            <div>
              <TitleMultiColor textNormal='Clien' textColorized='tes.' />
              <span>En total {clients.length} cliente(s)</span>
            </div>
            <div>
              <ButtonPrimaryIcon onClick={handleCreateGestion}><Io.IoMdAddCircle /> Crear Gestión</ButtonPrimaryIcon>
            </div>
          </ContentClientHead>
          <ContentClientBody>
            <Search>
              <Io.IoIosSearch className='icon-search' />
              <Input>
                <input type='search' placeholder='Search...' onChange={handleSearch} />
              </Input>
            </Search>
            {
              clientsFilter.length !== 0
                ? clientsFilter.map((client) => (
                  <ItemClient
                    key={client.docId}
                    client={client}
                    onView={() => navigate(`/client/${client.id}`)}
                  />
                ))
                : <div>No hay resultados</div>
            }
          </ContentClientBody>
        </ContentClients>
      </Content>
    </SideBar>
  )
}
