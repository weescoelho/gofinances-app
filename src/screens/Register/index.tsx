import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { Modal } from 'react-native';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
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

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
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
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button text='Enviar'/>
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategoryModal}/>
      </Modal>
    </Container>
  )
}