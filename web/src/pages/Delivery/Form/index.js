import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import SimpleInput from '~/components/Form/SimpleInput';
import AsyncSelectInput from '~/components/Form/AsyncSelectInput';
import HeaderForm from '~/components/Form/HeaderForm';
import { BackButton, SaveButton } from '~/components/utils/Button';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Unform } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const response = await api.get('/delivery', {
          params: {
            deliveryId,
          },
        });

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });
      }
    }
    loadInitialData(id);
  }, [id]);

  const customStylesSelectInput = {
    control: provided => ({
      ...provided,
      height: 45,
    }),
  };

  async function handleLoadRecipients(inputValue, callback) {
    const response = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(data);
  }

  async function handleLoadDeliveryman(inputValue, callback) {
    const response = await api.get('/deliveryman', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    callback(data);
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('Product name is required'),
        recipient_id: Yup.string().required('Recipient is required'),
        deliveryman_id: Yup.string().required('Sender is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/delivery/${id}`, {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        history.push('/delivery');
        toast.success('Order updated successfully.');
      } else {
        await api.post('/delivery', {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        toast.success('Order created successfully');
      }

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Create new order">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <Unform ref={formRef} onSubmit={handleSubmit}>
          <section>
            <AsyncSelectInput
              type="text"
              label="Recipient"
              name="recipient_id"
              placeholder="Recipient"
              noOptionsMessage={() => 'No recipient found'}
              loadOptions={handleLoadRecipients}
              styles={customStylesSelectInput}
            />
            <AsyncSelectInput
              type="text"
              label="Deliveryman"
              name="deliveryman_id"
              placeholder="Deliveryman"
              noOptionsMessage={() => 'No deliveryman found'}
              loadOptions={handleLoadDeliveryman}
              styles={customStylesSelectInput}
            />
          </section>
          <SimpleInput
            label="Product"
            name="product"
            type="text"
            placeholder="Name of the product"
            onKeyPress={e =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </Unform>
      </Content>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
