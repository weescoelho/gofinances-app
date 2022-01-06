import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import {Container, Title} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Title>Dashboard</Title>
      <StatusBar style="auto" />
    </Container>
  );
}