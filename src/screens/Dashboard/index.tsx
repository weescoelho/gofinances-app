import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de app",
      amount: "R$ 10,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "10/10/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Ifood",
      amount: "R$ 10,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "05/10/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 10,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "11/10/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/68740380?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Weslley</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 10,00"
          lastTransaction="última transação ontem"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 10,00"
          lastTransaction="última transação ontem"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 10,00"
          lastTransaction="última transação ontem"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item as DataListProps} />
          )}
        />
      </Transactions>
    </Container>
  );
}
