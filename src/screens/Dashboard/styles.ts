import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:${({ theme }) => theme.colors.background};
  flex:1;
  justify-content:center;
  align-items:center;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size:24px;
  color:${({ theme }) => theme.colors.primary};
`