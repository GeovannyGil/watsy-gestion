import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Fa from 'react-icons/fa'
import * as Io from 'react-icons/io'
import Logo from '../../assets/img/LogoSideBar.png'

export const Content = styled.main`
  width: 100%;
  height: 100%;
`

export const ContainerSidebar = styled.div`
  width: 20%;
  height: 100vh;
  position: fixed;
`

export const ContainerHead = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0 0 2rem;

  & img {
    width: 80%;
  }
`
export const ContainerNav = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1.5rem 2rem;
`
export const NameLink = styled.div`
  display: inline-block;
  color: #EFEFEF;
  font-size: 1.4rem;
`

export const IconLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EFEFEF;
  font-size: 2.3rem;
  padding: 0.8rem;
  margin: 0 2rem 0 0 ;
  border-radius: 1.5rem;
`

export const ContainerLink = styled(Link)`
  padding: 15px 25px;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s;
  border-radius: 10px;

  &.active,
  &:hover {
    background: linear-gradient(to right,#232323 0%, rgba(35, 35, 35, 0.15) 53%, rgba(255, 111, 0, 0.15) 100%);
  }

  &.active ${IconLink} {
    background-color: #FF5F00;
    box-shadow: 0 0 6px 2px #ff5f00;
  }
`
export const ContainerMain = styled.div`
  width: 80%;
  height: 100vh;
  margin-left: 20%;
`

export default function Sidebar ({ children }) {
  return (
    <>
      <Content>
        <ContainerSidebar>
          <ContainerHead>
            <Link to='/'>
              <img src={Logo} alt='Logo Watsy' />
            </Link>
          </ContainerHead>
          <ContainerNav>
            <ContainerLink to='/clientes'>
              <IconLink>
                <Fa.FaUserAlt />
              </IconLink>
              <NameLink>
                Clientes
              </NameLink>
            </ContainerLink>
            <ContainerLink to='/gestiones' className='active'>
              <IconLink>
                <Io.IoMdDocument />
              </IconLink>
              <NameLink>
                Gestiones
              </NameLink>
            </ContainerLink>
          </ContainerNav>
        </ContainerSidebar>
        <ContainerMain>
          {children}
        </ContainerMain>
      </Content>
    </>
  )
}
