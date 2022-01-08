import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container, Error } from "./styles";

interface InputForm extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export const InputForm: React.FC<InputForm> = ({
  control,
  name,
  error,
  ...props
}) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
