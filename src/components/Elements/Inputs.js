import styled from 'styled-components'

export const TextArea = styled.textarea`
    border: none;
    background-color: #171717;
    font-size: 1em;
    color: white;
    padding: 1.3em;
    width: 100%;
    border-radius: 1.2em;
    height: 200px;
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

      &:-webkit-autofill,
      &:-webkit-autofill:focus {
        color: #EFEFEF;
        font-size: 1.3em;
        font-weight: 500;
       transition: background-color 600000s 0s, color 600000s 0s;
      }

      &[data-autocompleted] {
        background-color: transparent !important;
        border: none;
        color: #EFEFEF;
        font-size: 1.3em;
        font-weight: 500;
        width: 100%;
        padding: 5px 0;
        border-bottom: 1px solid transparent;
      }
    }
  }
`

export const InputSelect = styled(Input)`
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.2em;
      font-weight: 500;
      outline: none;
      padding: 0 0px;
      width: 100%;

      & option{
        color: black;
      }
    }

  & .__Input__select-i-arrow{
    border-radius: 50%;
    cursor: pointer;
    padding: 5px;
    position: absolute;
    right: 10px;
    top: 40%;
  }
`
