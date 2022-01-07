import styled from 'styled-components/native';

import { TextInput } from 'react-native'
import theme from '../../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width:100%;
  padding:16px 18px;
  background-color:${({ theme }) => theme.colors.shape};

  font-size:${RFValue(14)}px;
  font-family:${({ theme }) => theme.fonts.regular};
  color:${({ theme }) => theme.colors.title};

  border-radius:5px;
  margin-bottom:8px;
`;

