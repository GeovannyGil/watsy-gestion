import styled from 'styled-components'

export const ButtonOnInput = styled.button`
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

export const ButtonIconAlone = styled.button`
  background-color: #FF5F00;
  border: none;
  color: #FBFBFB;
  font-size: 1.2em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;

  &:hover{
    background-color: #db5000;
  }
`
