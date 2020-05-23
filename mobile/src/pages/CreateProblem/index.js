import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  TextAreaInput,
  SubmitButton,
} from './styles';

export default function CreateProblem() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [description, setDescription] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { delivery_id } = route.params;

  async function handleSubmit({ reset }) {
    setLoading(true);
    try {
      await api.post(`/delivery/${delivery_id}/problems`, {
        description,
      });
      Alert.alert('Incident created successfully');
      navigation.navigate('Entregas');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }

    setLoading(false);
    reset();
  }

  return (
    <Container>
      <Background />

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextAreaInput
            name="description"
            placeholder="Write what went wrong."
            multiline
            onChangeText={setDescription}
            style={{
              textAlignVertical: 'top',
            }}
          />
        </Form>

        <SubmitButton
          loading={loading}
          onPress={() => formRef.current.submitForm()}
        >
          Send
        </SubmitButton>
      </Content>
    </Container>
  );
}
