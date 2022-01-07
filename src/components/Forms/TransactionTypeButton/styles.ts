import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from 'react-native';

interface ITypeProps {
  type: 'up' | 'down';
}

interface IContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  width:48%;
  flex-direction:row;
  align-items:center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};

  padding:16px;
  justify-content: center;
  border-radius:5px;

   ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
    border:0;
  `}

   ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    border:0;
  `}

`;

export const Icon = styled(Feather) <ITypeProps>`
  font-size:${RFValue(24)}px;
  margin-right:12px;
  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}
`;

export const Title = styled.Text`
  font-family:${({ theme }) => theme.fonts.regular};
  font-size:${RFValue(14)}px;
`;