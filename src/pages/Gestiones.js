import Sidebar from '../components/SideBar/Sidebar'
import styled from 'styled-components'
import { TextIndicador, TitleMultiColor } from '../components/Elements/Text'

const Content = styled.div`
  width: 100%;
  padding: 2em;
`

const ContentHeader = styled.div`
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
          </ContentBody>
        </ContentSpaceGestion>
      </Content>
    </Sidebar>
  )
}
