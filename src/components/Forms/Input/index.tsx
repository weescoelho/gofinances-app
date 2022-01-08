import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

type InputProps = TextInputProps;

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <Container {...props} />;
};
