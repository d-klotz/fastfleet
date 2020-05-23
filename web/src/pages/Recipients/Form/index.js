import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/utils/Button';
import SimpleInput from '~/components/Form/SimpleInput';
import MaskInput from '~/components/Form/MaskInput';
import HeaderForm from '~/components/Form/HeaderForm';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function RecipientsForm({ match }) {
  const { id } = match.params;
  const formRef = useRef();

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        const response = await api.get(`/recipients?recipientId=${id}`);

        const {
          name,
          address,
          number,
          complement,
          city,
          state,
          cep,
        } = response.data.recipient;

        formRef.current.setData({
          name,
          address,
          number,
          complement,
          city,
          state,
          cep: cep
            .toString()
            .match(/.{1,5}/g)
            .join('-'),
        });
      }
    }
    loadInitialData();
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Street is required'),
        number: Yup.string().required('Number is required'),
        complement: Yup.string().notRequired(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        cep: Yup.string().required('Zip code is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const cep = data.cep.replace(/-/g, '');

      if (id) {
        try {
          await api.put(`/recipients/${id}`, {
            name: data.name,
            address: data.address,
            number: data.number,
            complement: data?.complement,
            city: data.city,
            state: data.state,
            cep,
          });
          toast.success('Recipient updated successfully!');
          history.push('/recipients');
        } catch (err) {
          toast.error('There was an error updating this recipient.');
        }
      } else {
        try {
          await api.post('/recipients', {
            name: data.name,
            address: data.address,
            number: data.number,
            complement: data?.complement,
            city: data.city,
            state: data.state,
            cep,
          });
          toast.success('Recipient created successfully!');
        } catch (err) {
          toast.error('There was an error creating this recipient.');
        }
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
        <HeaderForm title="Recipient Creation">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <SimpleInput
            label="Name"
            name="name"
            type="text"
            placeholder="Name of the recipient"
          />
          <div>
            <SimpleInput
              label="Street"
              name="address"
              type="text"
              placeholder="Street of the recipient"
            />
            <SimpleInput
              label="Number"
              name="number"
              type="number"
              placeholder="House number"
            />
            <SimpleInput
              label="Adicional info"
              name="complement"
              placeholder="Adicional Info"
              type="text"
            />
          </div>
          <div>
            <SimpleInput
              label="City"
              name="city"
              type="text"
              placeholder="City of the recipient"
            />
            <SimpleInput
              label="State"
              name="state"
              type="text"
              placeholder="State of the recipient"
            />
            <MaskInput
              label="Zip Code"
              name="cep"
              type="text"
              maskPlaceholder={null}
              placeholder="_____-___"
              mask="99999-999"
              onKeyPress={e =>
                e.key === 'Enter' ? formRef.current.submitForm() : null
              }
            />
          </div>
        </UnForm>
      </Content>
    </Container>
  );
}

RecipientsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
