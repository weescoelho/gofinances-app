import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: "positive" | "negative";
  isActive: boolean;
}

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  isActive,
  ...props
}) => {
  return (
    <Container isActive={isActive} type={type} {...props}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
