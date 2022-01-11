import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { ActivityIndicator } from "react-native";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
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
  LoadContainer,
} from "./styles";
import { collectionsKey } from "../../storage";

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface IHighlightCardData {
  entries: {
    amount: string;
    lastTransactionDate: string;
  };
  expensives: {
    amount: string;
    lastTransactionDate: string;
  };
  total: {
    amount: string;
    lastTransaction: string;
  };
}

export function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>();
  const [highlightCardData, setHighlightCardData] =
    useState<IHighlightCardData>({} as IHighlightCardData);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative",
  ) {
    const lastTransaction = Math.max.apply(
      Math,
      collection
        .filter((transaction) => transaction.transactionType === type)
        .map((transaction) => new Date(transaction.date).getTime()),
    );

    const lastTransactionToDate = new Date(lastTransaction).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "2-digit",
      },
    );
    return lastTransactionToDate;
  }

  async function loadTransactionData() {
    const response = await AsyncStorage.getItem(collectionsKey.transactions);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.transactionType === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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

    const lastTransactionsEntry = getLastTransactionDate(
      transactions,
      "positive",
    );
    const lastTransactionsExpensive = getLastTransactionDate(
      transactions,
      "negative",
    );

    const totalInterval = `01 á ${lastTransactionsExpensive}`;

    let total = entriesTotal - expensiveTotal;
    setHighlightCardData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactionDate: lastTransactionsEntry,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactionDate: lastTransactionsExpensive,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              amount={highlightCardData.entries.amount}
              lastTransaction={`Última transação em ${highlightCardData.entries.lastTransactionDate}`}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightCardData.expensives.amount}
              lastTransaction={`Última transação em ${highlightCardData.expensives.lastTransactionDate}`}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightCardData.total.amount}
              lastTransaction={highlightCardData.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
