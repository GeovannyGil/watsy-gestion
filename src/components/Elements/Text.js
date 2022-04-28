import styled from 'styled-components'

export const Title = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;

  & span {
    color: #FF6E00;
  }
`

export const Subtitle = styled.label`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;

`

export const TitleMultiColor = ({ textNormal, textColorized, classText }) => {
  return (
    <Title className={classText}>
      {textNormal}<span>{textColorized}</span>
    </Title>
  )
}

/* TITLE LINE */
const ContentTitleLine = styled.div`
  margin-top: ${(props) => props.my || 0};
  margin-bottom: ${(props) => props.my || 0};
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #FF6E00;
`

export const TextIndicador = ({ children, text, my = 0 }) => {
  return (
    <ContentTitleLine my={my}>
      <Subtitle>
        {text}
      </Subtitle>
      {children}
    </ContentTitleLine>
  )
}
/* TITLE LINE */
