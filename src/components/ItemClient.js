import styled from 'styled-components'
import * as Io from 'react-icons/io'
import { Link } from 'react-router-dom'

const ContentClientItem = styled(Link)`
  background-color: #232323;
  border-radius: 0.8em;
  display: grid;
  /* grid-template-columns: 15% 35% 30% 15% 5%; */
  grid-template-columns: 0.3fr 1fr 0.5fr 0.7fr 0.1fr;
  align-items: center;
  padding: 1em 1.4em;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover{
    border-color: #FF6E00;
  }

  & div{
    font-weight: 600;
    color: #929292;
  }

  & div:nth-child(1),
  & div:nth-child(3){
    color: #EFEFEF;
  }

  & div:nth-child(4){
    background-color: ${props => props.state || '#33d69f0d'};
    color: ${props => props.color || '#33d69f'};
    padding: 1em;
    border-radius: 1em;
    margin: 0 auto;
    width: 55%;
    text-align: center;
  }
`
/*
    state='#ff8f00' color='##ff8f000d'
    state='#153903b3' color='#64fe17'
*/
const ItemClient = ({ client, onView }) => {
  let state = ''
  let color = ''
  if (client.state === 'Pendiente') {
    state = '#ff8f000d'
    color = '#ff8f00'
  }
  return (
    <ContentClientItem to={`/gestiones/${client.docId}`} state={state} color={color}>
      <div>{client.docId.slice(0, 8)}</div>
      <div>{`${client.names} ${client.lastNames}`}</div>
      <div>{`${client.cui}`}</div>
      <div>{`${client.state}`}</div>
      <div>
        <Io.IoMdArrowDropright />
      </div>
    </ContentClientItem>
  )
}

export default ItemClient
