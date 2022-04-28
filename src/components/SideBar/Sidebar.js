import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import * as Fa from 'react-icons/fa'
import * as Io from 'react-icons/io'
// import * as Io from 'react-icons/io'
// import Logo from '../../assets/img/LogoSideBar.png'
import LogoAlone from '../../assets/img/LogoAlone.png'
import clsx from 'clsx'

export const Content = styled.main`
  width: 100%;
  height: 100%;
`

export const ContainerHead = styled.div`
  display: flex;
  align-items: center;
`

export const ContainerNav = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1.5rem 2rem;
  height: 90%;
  align-content: space-between;
`
export const IconLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EFEFEF;
  padding: 0.8rem;
`

export const ContainerLink = styled(Link)`
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

export const NameLink = styled.div`
  display: inline-block;
  color: #EFEFEF;
  font-size: 1.4rem;
`

export const ContainerSidebar = styled.div`
  width:100px;
  background-color: #171717;
  height: 100%;
  position: fixed;
  transition:width .2s linear;
  transform:translateZ(0) scale(1,1);
  box-shadow: 1px 0 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  top:0;
  bottom:0;
  left:0;
  z-index: 100;
  &:hover{
    width: 350px;

    & ${ContainerHead} {
      padding: 2rem 0 0 2em;
      & img {}
    }
    & ${ContainerNav} {
      padding: 1.5rem 2rem;
    }

    & ${IconLink} {
      margin: 0 2rem 0 0 ;
      font-size: 2.3rem;
      border-radius: 1.5rem;
    }

    & ${ContainerLink} {
      padding: 15px 25px;
      & ${NameLink} {
        opacity: 1;
        display: block;
        transition: all 0.3s;
      }
    }

  }

  & ${ContainerHead} {
    padding: 2rem 0 0 1.2em;
  }

  & ${ContainerHead} img{
      width: 60px;
  }

  & ${ContainerNav} {
    padding: 1.5rem 0.5rem;
  }

  & ${IconLink} {
    font-size: 1.5rem;
    border-radius: 1rem;
    margin: 0;
  }

  & ${ContainerLink} {
    padding: 15px;

    & ${NameLink} {
      opacity: 0;
      display: none;
    }
  }
`

export const ContainerMain = styled.div`
  width: auto;
  height: 100vh;
  margin-left: 100px;
`

export default function Sidebar ({ children }) {
  const location = useLocation()
  const pathname = location.pathname.split('/')[1]
  return (
    <>
      <Content>
        <ContainerSidebar>
          <ContainerHead>
            <Link to='/'>
              <img src={LogoAlone} alt='Logo Watsy Alone' />
            </Link>
          </ContainerHead>
          <ContainerNav>
            <div>
              <ContainerLink to='/clients' className={clsx(pathname === 'clients' && 'active')}>
                <IconLink>
                  <Fa.FaUserAlt />
                </IconLink>
                <NameLink>
                  Clientes
                </NameLink>
              </ContainerLink>
            </div>
            {/*
              <ContainerLink to='/gestiones' className={clsx(pathname === 'gestiones' && 'active')}>
                <IconLink>
                  <Io.IoMdDocument />
                </IconLink>
                <NameLink>
                  Gestiones
                </NameLink>
              </ContainerLink>
            */
            }
            <ContainerLink to='/signout'>
              <IconLink>
                <Io.IoMdLogOut />
              </IconLink>
              <NameLink>
                Cerrar Sesión
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
