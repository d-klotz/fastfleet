/* eslint-disable no-alert */

import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import More from '~/components/utils/More';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, MoreConainer, ModalContainer } from './styles';

export default function ProblemItem({ data, updateProblems }) {
  async function handleCancel() {
    const confirm = window.confirm(
      'Você tem certeza que deseja cancelar isso?'
    );

    if (!confirm) {
      toast.error('Order not cancelled!');
      return;
    }

    try {
      await api.post(`/problems/${data.id}/cancel-delivery`);
      updateProblems();
      toast.success('Order cancelled successfully!');
    } catch (err) {
      toast.error('This order cant be cancelled!');
    }
  }

  return (
    <Container>
      <small>#{data.delivery_id}</small>
      <small>{data.description}</small>
      <More
        contentStyle={{
          width: '200px',
          borderRadius: '4px',
        }}
      >
        <MoreConainer>
          <div>
            <Modal>
              <ModalContainer>
                <strong>CURRENT PROBLEM</strong>
                <p>{data.description}</p>
              </ModalContainer>
            </Modal>
          </div>
          <div>
            <button onClick={handleCancel} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Cancel Order</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

ProblemItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    delivery_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};
