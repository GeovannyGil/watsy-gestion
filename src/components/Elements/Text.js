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

export const TitleMultiColor = ({ textNormal, textColorized }) => {
  return (
    <Title>
      {textNormal} <span>{textColorized}</span>
    </Title>
  )
}

/* TITLE LINE */
const ContentTitleLine = styled.div`
`

export const TextIndicador = ({ text }) => {
  return (
    <ContentTitleLine>
      <Subtitle>
        {text}
      </Subtitle>
      <hr />
    </ContentTitleLine>
  )
}
/* TITLE LINE */
