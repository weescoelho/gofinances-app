import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Text } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <Container {...props}>
      <Text>{text}</Text>
    </Container>
  );
};
