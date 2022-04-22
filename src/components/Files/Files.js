import * as Bs from 'react-icons/bs'
import * as Io from 'react-icons/io'
import styled from 'styled-components'
import { ButtonIconAlone } from '../Elements/Buttons'

const GroupButtonsAndText = styled.div`
      display: grid;
      width: 100%;

    & div{
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
`

const File = styled.div`
    display: grid;
    padding: 15px 20px;
    border-radius: 0.5em;
    grid-template-columns: 0.3fr 1fr;
    grid-gap: 5px;
    background-color: #171717;
    align-items: center;

    &{
      font-size: 3rem;
    }

    & ${GroupButtonsAndText}{

      & p {
        font-size: 1rem;
        margin-bottom: 5px;
      }

      & button {
        font-size: 0.4em;
      }
    }
`

export const FileComponent = ({ file, onClick }) => {
  return (
    <File>
      <Bs.BsFileEarmarkZipFill />
      <GroupButtonsAndText>
        <p>Archivo.zip</p>
        <div>
          <ButtonIconAlone>
            <Io.IoMdTrash />
          </ButtonIconAlone>
          <ButtonIconAlone>
            <Io.IoMdEye />
          </ButtonIconAlone>
        </div>
      </GroupButtonsAndText>
    </File>
  )
}
