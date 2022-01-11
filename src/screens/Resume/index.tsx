import React, { useCallback, useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  LoadContainer,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  Month,
  MonthSelectIcon,
} from "./styles";
import { collectionsKey } from "../../storage";
import { categories } from "../../utils/categories";
import { useTheme } from "styled-components";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/core";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StorageData {
  transactionType: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export const Resume: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const storageData = await AsyncStorage.getItem(collectionsKey.transactions);
    const storageDataFormatted: StorageData[] = storageData
      ? JSON.parse(storageData)
      : [];

    const expensives = storageDataFormatted.filter(
      (expensive) =>
        expensive.transactionType === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, item: StorageData) => {
        return acc + Number(item.amount);
      },
      0,
    );
    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const percent = (categorySum / expensivesTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted: categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: category.color,
          percent,
          percentFormatted,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
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
            <Title>Resumo</Title>
          </Header>
          <Content
            contentContainerStyle={{
              padding: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
            showsVerticalScrollIndicator={false}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange("prev")}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </Month>
              <MonthSelectButton onPress={() => handleDateChange("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>
            <ChartContainer>
              {totalByCategories.length > 0 && (
                <VictoryPie
                  data={totalByCategories}
                  x="percentFormatted"
                  y="total"
                  colorScale={totalByCategories.map(
                    (category) => category.color,
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  labelRadius={50}
                />
              )}
            </ChartContainer>
            {totalByCategories.length > 0 &&
              totalByCategories.map((item) => (
                <HistoryCard
                  key={uuid.v4() as string}
                  title={item.name}
                  color={item.color}
                  amount={item.totalFormatted}
                />
              ))}
          </Content>
        </>
      )}
    </Container>
  );
};
