import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid e-mail')
    .required('The e-mail is required'),
  password: Yup.string().required('The password is required'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Fastfleet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="YOUR E-MAIL"
          type="email"
          placeholder="exemple@email.com"
        />
        <Input
          name="password"
          label="YOUR PASSWORD"
          type="password"
          placeholder="*************"
        />

        <button
          style={loading ? { cursor: 'wait' } : { cursor: 'pointer' }}
          type="submit"
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </Form>
    </>
  );
}

export default SignIn;
