import React from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import {
  Container,
  Ball,
  Line,
  ProgressContainer,
  Descriptions,
  Description,
} from './styles';

export default function DeliveryProgress({ status }) {
  return (
    <Container>
      <ProgressContainer>
        <Ball
          marked={
            status === 'PENDING' ||
            status === 'WITHDRAWN' ||
            status === 'DELIVERED'
          }
        />
        <Line />
        <Ball marked={status === 'DELIVERED' || status === 'WITHDRAWN'} />
        <Line />
        <Ball marked={status === 'DELIVERED'} />
      </ProgressContainer>
      <Descriptions>
        <View>
          <Description>Waiting</Description>
          <Description>Withdraw</Description>
        </View>
        <Description>Withdraw</Description>
        <Description>Delivered</Description>
      </Descriptions>
    </Container>
  );
}

DeliveryProgress.propTypes = {
  status: PropTypes.string.isRequired,
};
