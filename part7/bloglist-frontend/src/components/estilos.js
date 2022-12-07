import styled, { css } from 'styled-components'


export const Button = styled.button`
  cursor: pointer;
  margin: ${props => props.theme.margin};
  padding: 0.25em;
  &:hover {
    background: ${props => props.theme.first_color};
  }
  ${(props) => {
    switch (props.$mode) {
    case 'primary':
      return css`
        font-size: 1em;
        color : ${props => props.theme.primary_text_color};
        border-radius: ${props => props.theme.radius};
        background: #FFFFFF;
        border: 2px solid ${props => props.theme.first_color};
      `
    default:
      return css`
        border-radius: ${props => props.theme.radius};
        font-size: 1em;
        color : ${props => props.theme.primary_text_color};
        background: ${props => props.theme.second_color};
        border: 2px solid ${props => props.theme.third_color};
      `
    }
  }}
`
export const Container = styled.div`
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};
  border-radius: ${props => props.theme.radius}
`

export const ItemContainer = styled(Container)`
  background:${props => props.theme.first_color };
  border: 2px solid ${props => props.theme.fourth_color};
`
export const Title = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  grid-auto-rows: minmax(50px, auto);
  margin: ${props => props.theme.margin}
`

export const BlogContainer = styled(Container)`
  background: ${props => props.theme.third_color};
  color: ${props => props.theme.first_text_color};
  font-size: ${props => props.theme.font_size};
`
export const CommentContainer = styled(Container)`
  background: ${props => props.theme.first_color};
`

export const ContentContainer = styled(Container)`
  margin: 0em;
  padding: 0.25em;
  color : ${props => props.theme.first_text_color};
  font-weight: 600;
  ${(props) => {
    switch (props.$mode) {
    case 'primary':
      return css`
        display: flex;
        justify-content: center;
        align-items:center;
      `
    default:
      return css`
        display: block;
      `
    }
  }}
`

export const ExternalLink = styled.a`
  color: ${props => props.theme.first_text_color};
  font-weight: bold;
`
export const TextInput = styled.input.attrs(props => ({
  type: 'text',
  size: props.size || '1em',
}))`
  margin: ${props => props.theme.margin};
  border: 2px solid ${props => props.theme.fourth_color};
  border-radius: 0.5em;
`
export const PasswordInput = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '1em',
}))`
  margin: ${props => props.theme.margin};
  border: 2px solid ${props => props.theme.fourth_color};
  border-radius: 0.5em;
`

export const Navigation = styled.div`
  background: ${props => props.theme.third_color};
  padding: 1em;
`
export const theme = {
  margin: '0.5em 2em 0.5em 2em',
  padding: '0em 0.5em 0.5em 0.5em',
  font_size: '1em',
  radius: '0.5em',
  //color
  first_color: '#CBEDD5',
  second_color: '#97DECE',
  third_color: '#62B6B7',
  fourth_color: '#439A97',
  //text color
  first_text_color: '#222831',
}

