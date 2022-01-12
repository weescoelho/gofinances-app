import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from "./styles";

interface SignInSocialButtonProps extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <Button activeOpacity={0.7} {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
};
