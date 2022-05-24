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

  &:disabled{
    background-color: #b3b3b3;
    cursor: no-drop;
    color: #efefef;
  }
`
export const ButtonSecondary = styled.button`
  background-color: transparent;
  font-size: 'Poppins';
  width: 100%;
  border: 2px solid #FF6F00;
  color: #FBFBFB;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 0.5em;
  padding: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover{
    background-color: #FF6F00;
  }

  &:disabled{
    border-color: #b3b3b3;
    cursor: no-drop;
    color: #efefef;
  }
`

export const ButtonPrimary = styled.button`
  background-color: #FF6F00;
  font-size: 'Poppins';
  width: 100%;
  border: 2px solid transparent;
  color: #FBFBFB;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 0.5em;
  padding: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover{
    background-color: #d85e02;
  }

  &:disabled{
    border-color: #b3b3b3;
    cursor: no-drop;
    color: #efefef;
  }
`

export const ButtonPrimaryIcon = styled.button`
  background-color: #FF6F00;
  font-size: 'Poppins';
  width: 100%;
  border: 2px solid transparent;
  color: #FBFBFB;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 0.5em;
  padding: 6px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;

  &:hover{
    background-color: #d85e02;
  }

  &:disabled{
    border-color: #b3b3b3;
    cursor: no-drop;
    color: #efefef;
  }
`

export const ButtonLinkIconSecondary = styled.a`
  background-color: transparent;
  font-size: 'Poppins';
  width: 100%;
  border: 2px solid #FF6F00;
  text-decoration: none;
  color: #FBFBFB;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 0.5em;
  padding: 6px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;

  &:hover{
    background-color: #FF6F00;
    color: #FBFBFB;
  }

  &:disabled{
    border-color: #b3b3b3;
    cursor: no-drop;
    color: #efefef;
  }
`

export const GroupButtons = styled.div`
  position: absolute;
  top: 7%;
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
