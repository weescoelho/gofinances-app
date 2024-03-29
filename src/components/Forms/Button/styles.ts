import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../../global/styles/theme';

export const Container = styled.TouchableOpacity`
  width:100%;
  background-color:${({ theme }) => theme.colors.secondary};

  padding:18px;
  border-radius:5px;
  align-items:center;
`

export const Text = styled.Text`
  font-family:${({ theme }) => theme.fonts.medium};
  font-size:${RFValue(14)}px;
  color:${({ theme }) => theme.colors.shape};
  text-align: center;
`;