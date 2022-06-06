import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
// import { useRef, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { ImageConfig } from '../config/ImageConfig'
import uploadImg from '../Upload.png'
import * as Bi from 'react-icons/bi'
// import { CleanUploadFile } from '../../../pages/Gestiones'

const DropFileInputContet = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  border: 2px dashed #FF5F00;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #232323;

  & input{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &:hover,
  &.dragover{
    opacity: 0.6;
  }
`

const DropFileInputLabel = styled.div`
  text-align: center;
  color: #929292;
  font-weight: 600;
  padding: 10px;

  & img{
    width: 100px;
    margin-bottom: 10px;
  }
`

const DropFilePreview = styled.div`
  margin-top: 30px;

  & p{
    font-weight: 500;
    margin: 0;
  }

  & .__title{
    margin-bottom: 20px;
  }

  & .__item{
    position: relative;
    display: flex;
    margin-bottom: 10px;
    background-color: #232323;
    padding: 15px;
    border-radius: 20px;
    font-size: 0.8em;

    & img{
      width: 50px;
      height: 50px;
      margin-right: 20px;
      object-fit: contain;
    }

    & .__item__info{
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
  }

`

const DropFileInput = (props) => {
  const wrapperRef = useRef(null)
  const [fileList, setFileList] = useState([])
  // const [stateClean, setStateClean] = useContext(CleanUploadFile)

  // useEffect(() => {
  //   if (stateClean) {
  //     setFileList([])
  //     props.onFileChange([])
  //     props.onFileList([])
  //     setStateClean(false)
  //   }
  // }, [stateClean])

  const onDragEnter = () => wrapperRef.current.classList.add('dragover')

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

  const onDrop = () => wrapperRef.current.classList.remove('dragover')

  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const updateList = [...fileList, newFile]
      setFileList(updateList)
      props.onFileChange(updateList)
      props.onFileList(updateList)
    }
  }

  // function sendFilesArray () {
  //   props.onFileList(fileList)
  // }

  const fileRemove = (file) => {
    const updateList = [...fileList]
    updateList.splice(fileList.indexOf(file), 1)
    setFileList(updateList)
    props.onFileChange(updateList)
    props.onFileList(updateList)
  }

  return (
    <>
      <DropFileInputContet
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <DropFileInputLabel>
          <img src={uploadImg} alt='' />
          <p>Arrastra y suelta tu archivo aquí</p>
        </DropFileInputLabel>
        <input type='file' name='files' value='' onChange={onFileDrop} />
      </DropFileInputContet>
      {
        fileList.length > 0
          ? (
            <DropFilePreview>
              <p className='__title'>
                Ready to upload
              </p>
              {
                fileList.map((item, i) => (
                  <div key={i} className='__item'>
                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig.default} alt='' />
                    <div className='__item__info'>
                      <p>{item.name}</p>
                      <p>{item.size}B</p>
                    </div>
                    <span className='__item__del' onClick={() => fileRemove(item)}><Bi.BiTrash /></span>
                  </div>
                ))
              }
            </DropFilePreview>
            )
          : null
      }
    </>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
  onFileList: PropTypes.func
}

export default DropFileInput
