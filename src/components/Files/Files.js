import * as Bi from 'react-icons/bi'
import * as Bs from 'react-icons/bs'
import styled from 'styled-components'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Image } from 'primereact/image'
// import { ButtonIconAlone } from '../Elements/Buttons'

const File = styled.div`
      position: relative;
      display: flex;
      margin-bottom: 5px;
      background-color: #171717;
      padding: 15px;
      border-radius: 20px;
      font-size: 0.8em;

      & img, & .__item_iconPDF{
        width: 50px;
        height: 50px;
        cursor: pointer;
        object-fit: contain;
      }

      & .__item__info{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &:hover  .__item__del{
        opacity: 1;
      }

      & .__item__del{
        background-color: #FF5F00;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 10px;
        top: 50%;
        font-size: 1.5em;
        transform: translateY(-50%);
        box-shadow: 0px 0px 5px #171717;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
`

export const FileComponent = ({ file, onSetPDF, onHandleDelete, onDownload }) => {
  if (file.ext === 'pdf') {
    return (
      <File
        key={file.id}
      >
        <Bs.BsFilePdfFill className='__item_iconPDF' onClick={() => onSetPDF(file)} />
        <div className='__item__info'>
          <p>{file.name}</p>
        </div>
        <span className='__item__del' onClick={() => onHandleDelete(file.name, file.id)}><Bi.BiTrash /></span>
      </File>
    )
  } else if (file.ext === 'jpg' || file.ext === 'png' || file.ext === 'jpeg' || file.ext === 'svg+xml' || file.ext === 'gif' || file.ext === 'svg') {
    return (
      <File
        key={file.id}
      >
        <Image src={file.url} alt='' preview downloadable />
        <div className='__item__info'>
          <p>{file.name}</p>
        </div>
        <span className='__item__del' onClick={() => onHandleDelete(file.name, file.id)}><Bi.BiTrash /></span>
      </File>
    )
  } else {
    return (
      <File
        key={file.id}
      >
        <Bs.BsFileEarmarkFill className='__item_iconPDF' onClick={() => onDownload(file)} />
        <div className='__item__info'>
          <p>{file.name}</p>
        </div>
        <span className='__item__del' onClick={() => onHandleDelete(file.name, file.id)}><Bi.BiTrash /></span>
      </File>
    )
  }
}
