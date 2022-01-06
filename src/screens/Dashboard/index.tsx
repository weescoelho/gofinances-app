import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import {Container} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Text>Dashboard</Text>
      <StatusBar style="auto" />
    </Container>
  );
}