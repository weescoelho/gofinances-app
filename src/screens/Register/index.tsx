import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import
{
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
}
  from './styles';

export const Register: React.FC = () => {

  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
            <Input placeholder='Nome'/>
          <Input placeholder='Preço' />
          <TransactionsTypes>
              <TransactionTypeButton type='up' title='Incoming' onPress={() => handleTransactionTypeSelect('up')} isActive={transactionType === 'up'}/>
              <TransactionTypeButton type='down' title='Outcome' onPress={() => handleTransactionTypeSelect('down')} isActive={transactionType === 'down'}/>
         </TransactionsTypes>
        </Fields>
        <Button text='Enviar'/>
      </Form>
    </Container>
  )
}