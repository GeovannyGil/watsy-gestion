import styled from 'styled-components'

export const GroupButtons = styled.div`
  position: absolute;
  top: 15%;
  right: 2%;

  & button{
    background-color: transparent;
    border: none;
    color: #FF5F00;
    font-size: 1.5em;
    cursor: pointer;

    &:hover{
      color: #db5000;
    }
  }
`

export const Input = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #171717;
  border-radius: 1em;
  position: relative;
  margin-bottom: ${(props) => props.marginBottom || 0};

  & {
    label{
      font-weight: 600;
      color: #929292;
    }

    input {
      background-color: transparent;
      border: none;
      color: #EFEFEF;
      font-size: 1.3em;
      font-weight: 500;
      width: 100%;
      padding: 5px 0;
      border-bottom: 1px solid transparent;

      &:focus {
        outline: none;
        border-color: #FF5F00;
      }
    }
  }
`
