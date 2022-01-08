import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
import { collectionsKey } from "../../storage";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>();

  async function loadTransactionData() {
    const response = await AsyncStorage.getItem(collectionsKey.transactions);
    const transactions = response ? JSON.parse(response) : [];

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          category: item.category,
          transactionType: item.transactionType,
          date: dateFormatted,
        };
      },
    );
    setData(transactionFormatted);
  }

  useEffect(() => {
    loadTransactionData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactionData();
    }, []),
  );

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
