import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { Container, Header,UserWrapper,UserInfo, Photo , User, UserGreeting, UserName, Icon, HighlightCards} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/68740380?v=4'}}/>
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>Weslley</UserName>
          </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard type='up' title='Entradas' amount='R$ 10,00' lastTransaction='última transação ontem'/>
        <HighlightCard type='down' title='Saídas' amount='R$ 10,00' lastTransaction='última transação ontem'/>
        <HighlightCard type='total' title='Total' amount='R$ 10,00' lastTransaction='última transação ontem'/>
      </HighlightCards>
    </Container>
  );
}