import styled from 'styled-components'
import DropFileInput from './drop-file-input/DropFileInput'

const Upload = styled.div`
  width: 100%;
  padding: 30px;
  /* border: 2px dashed #FF5F00; */
  background-color: #171717;
  border-radius: 20px;
  box-shadow: rgba(27, 27, 27, 0.2) 0px 8px 24px;
  font-weight: 400;
  line-height: 1.5;
`

// const Header = styled.h2`
//   margin-bottom: 30px;
//   text-align: center;
// `

export default function UploadFiles ({ onFileList }) {
  const onFileChange = (files) => {
    console.log(files)
  }

  return (
    <Upload>
      {/* <Header>
        React Drop Files Input
      </Header> */}
      <DropFileInput
        onFileChange={(files) => onFileChange(files)} onFileList={onFileList}
      />
    </Upload>
  )
}
