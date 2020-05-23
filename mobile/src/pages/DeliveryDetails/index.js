import React from 'react';
import { Alert, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import colors from '~/styles/colors';

import {
  Container,
  Background,
  Content,
  Card,
  TitleContainer,
  Title,
  Label,
  Value,
  Status,
  Menu,
  Option,
  OptionTitle,
} from './styles';

export default function DeliveryDetails() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();
  const { delivery } = route.params;

  async function handleDeliveryWithdraw() {
    async function delievryWithdraw() {
      try {
        await api.put(
          `/deliveryman/${auth.id}/deliveries/${delivery.id}/start`,
          {
            start_date: new Date(),
          }
        );

        navigation.navigate('Entregas');
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }

    Alert.alert(
      'Withdraw Confirmation',
      'Do you really want to confirm the withdraw of this order?',
      [
        {
          text: 'Cancel',
          style: 'destructive',
        },
        {
          text: 'Confirm',
          onPress: delievryWithdraw,
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Background />
      <Content>
        <Card>
          <TitleContainer>
            <Icon name="local-shipping" color={colors.primary} size={20} />
            <Title>Delivery Information</Title>
          </TitleContainer>
          <Label>Recipient</Label>
          <Value>{delivery.recipient.name}</Value>
          <Label>Delivery Address</Label>
          <Value>
            {delivery.recipient.address}, {delivery.recipient.number},{' '}
            {delivery.recipient.city} - {delivery.recipient.state},{' '}
            {delivery.recipient.cep}
          </Value>
          <Label>Order</Label>
          <Value>{delivery.product}</Value>
        </Card>

        <Card>
          <TitleContainer>
            <Icon name="event" color={colors.primary} size={20} />
            <Title>Delivery Status</Title>
          </TitleContainer>
          <Label>STATUS</Label>
          <Status>
            {delivery.status === 'DELIVERED' ? 'Delivered' : ''}
            {delivery.status === 'WITHDRAWN' ? 'Withdrawn' : ''}
            {delivery.status === 'PENDING' ? 'Pending' : ''}
            {delivery.status === 'CANCELED' ? 'Cancelled' : ''}
          </Status>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Label>Withdraw date</Label>
              <Value>{delivery.start_date_formated}</Value>
            </View>
            <View>
              <Label>Delivery Date</Label>
              <Value>{delivery.end_date_formated}</Value>
            </View>
          </View>
        </Card>

        <Menu>
          <Option
            onPress={() =>
              navigation.navigate('CreateProblem', {
                delivery_id: delivery.id,
              })
            }
          >
            <Icon name="highlight-off" color={colors.danger} size={20} />
            <OptionTitle>Report{`\n`}Incident</OptionTitle>
          </Option>
          <Option
            onPress={() =>
              navigation.navigate('ViewProblem', {
                delivery_id: delivery.id,
                product_name: delivery.product,
              })
            }
          >
            <Icon name="info-outline" color="#E7BA40" size={20} />
            <OptionTitle>View{`\n`}Incident</OptionTitle>
          </Option>
          {delivery.status === 'PENDING' ? (
            <Option onPress={handleDeliveryWithdraw}>
              <Icon name="local-shipping" color={colors.primary} size={20} />
              <OptionTitle>Make{`\n`}Withdraw</OptionTitle>
            </Option>
          ) : (
            <Option
              onPress={() =>
                navigation.navigate('ConfirmPicture', {
                  delivery_id: delivery.id,
                })
              }
            >
              <Icon name="check-circle" color={colors.primary} size={20} />
              <OptionTitle>Confirm{`\n`}Delivery</OptionTitle>
            </Option>
          )}
        </Menu>
      </Content>
    </Container>
  );
}
