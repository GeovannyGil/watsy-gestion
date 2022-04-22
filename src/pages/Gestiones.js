import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'
import { Input, GroupButtons } from '../components/Elements/Inputs'
import * as Io from 'react-icons/io'
import * as Ai from 'react-icons/ai'
import NumberFormat from 'react-number-format'

const Content = styled.div`
  width: 100%;
  padding: 2em;
`

const ContentHeader = styled.div`
  margin-bottom: 15px;
`

const ContentBody = styled.div`
`

const ButtonOnInput = styled.button`
  background-color: transparent;
  border: none;
  color: #FBFBFB;
  font-size: 1.2em;
  position: absolute;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  bottom: 15%;
  right: 5%;
  cursor: pointer;

  &:hover{
    color: #FF5F00;
  }
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

export default function Gestiones () {
  return (
    <Sidebar>
      <Content>
        <ContentSpaceGestion>
          <ContentHeader>
            <TitleMultiColor textNormal='Crear' textColorized='Gestiones.' />
          </ContentHeader>
          <ContentBody>
            <TextIndicador text='Datos Generales' />
            <Input marginBottom='15px'>
              <GroupButtons>
                <button><Io.IoMdCopy /></button>
              </GroupButtons>
              <label>Nombres</label>
              <input type='text' />
            </Input>
            <GridInputs>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Apellidos</label>
                  <input type='text' />
                </Input>
                <Input>
                  <GroupButtons>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Teléfono</label>
                  <NumberFormat
                    type='text'
                    name='phoneClient'
                    format='+(502) ####-####'
                    allowEmptyFormatting
                    mask='_'
                  />
                </Input>
              </GroupGridContentDouble>
              <GroupGridContentDouble>
                <Input>
                  <GroupButtons>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>CUI</label>
                  <NumberFormat
                    type='text'
                    name='phoneClient'
                    format='#### ##### ####'
                    allowEmptyFormatting
                    mask='-'
                  />
                </Input>
                <Input>
                  <GroupButtons>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Fecha de nacimiento</label>
                  <NumberFormat
                    type='text'
                    name='phoneClient'
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
                    <button><Ai.AiOutlineReload /></button>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Correo Electrónico</label>
                  <input tyep='email' />
                </Input>
                <Input>
                  <GroupButtons>
                    <button><Ai.AiOutlineReload /></button>
                    <button><Io.IoMdCopy /></button>
                  </GroupButtons>
                  <label>Contraseña</label>
                  <input type='password' />
                  <ButtonOnInput>
                    <Ai.AiFillEyeInvisible />
                  </ButtonOnInput>
                </Input>
              </GroupGridContentDouble>
            </GridInputs>
          </ContentBody>
        </ContentSpaceGestion>
      </Content>
    </Sidebar>
  )
}
