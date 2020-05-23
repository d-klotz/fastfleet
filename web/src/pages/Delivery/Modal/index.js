import React from 'react';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';

import { Container } from './styles';

export default function DeliveryModal({ data }) {
  const { address, number, city, state, cep } = data.recipient;

  return (
    <Modal>
      <Container>
        <div>
          <strong>Order's Information</strong>
          <small>
            {address}, {number}
          </small>
          <small>
            {city} - {state}
          </small>
          <small>ZIP {cep}</small>
        </div>
        {data.start_dateFormatted ? (
          <div>
            <strong>Dates</strong>
            <div>
              <span>Withdrawal: </span>
              <small>{data.start_dateFormatted}</small>
            </div>
            {data.end_dateFormatted ? (
              <div>
                <span>Delivery: </span>
                <small>{data.end_dateFormatted}</small>
              </div>
            ) : null}
            {data.canceled_dateFormatted ? (
              <div>
                <span>Cancelled: </span>
                <small>{data.canceled_dateFormatted}</small>
              </div>
            ) : null}
          </div>
        ) : null}
        {data.signature ? (
          <div style={{ paddingBottom: '25px' }}>
            <strong>Recipient Signature</strong>
            <img src={data.signature.url} alt="signature" />
          </div>
        ) : null}
      </Container>
    </Modal>
  );
}

DeliveryModal.propTypes = {
  data: PropTypes.shape({
    start_dateFormatted: PropTypes.string,
    end_dateFormatted: PropTypes.string,
    canceled_dateFormatted: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      cep: PropTypes.string,
    }),
    status: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
