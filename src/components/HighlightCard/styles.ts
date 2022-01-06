import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<ITypeProps>`
  background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px 42px;
  margin-right:16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<ITypeProps>`
  font-size: ${RFValue(14)}px;
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather) <ITypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<ITypeProps>`
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top:38px;
`;

export const LastTransaction = styled.Text<ITypeProps>`
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
`;
