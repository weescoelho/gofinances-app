import { Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex:1;
`

export const Header = styled.View`
  width:100%;
  height:70%;
  background-color:${({ theme }) => theme.colors.primary};

  justify-content:flex-end;
  align-items:center;
`

export const TitleWrapper = styled.View`
  align-items:center;
`

export const Title = styled.Text`
  font-family:${({ theme }) => theme.fonts.medium};
  color:${({ theme }) => theme.colors.shape};
  font-size:${RFValue(30)}px;
  text-align: center;
  margin-top:45px;
`

export const SignInTitle = styled.Text`
  font-family:${({ theme }) => theme.fonts.regular};
  color:${({ theme }) => theme.colors.shape};
  font-size:${RFValue(16)}px;
  text-align: center;
  margin:80px 0 67px;
`

export const Footer = styled.View`
 width:100%;
 height:30%;
 background-color:${({ theme }) => theme.colors.secondary};
`

export const FooterWrapper = styled.View`
 

 padding: 0 32px;
 justify-content:space-between;

 ${() => {
    if (Platform.OS === 'ios') {
      return css`
         margin-top:${RFPercentage(-4)}px;
       `
    } else {
      return css`
         margin-top:${RFPercentage(4)}px;
       `
    }
  }}
`