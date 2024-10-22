import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Avatar,
  Content,
  NamePhoto,
  Details,
  Label,
  Information,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        {profile?.avatar ? (
          <Avatar source={{ uri: profile?.avatar?.url }} />
        ) : (
          <>{profile?.name && <NamePhoto name={profile?.name} />}</>
        )}

        <Details>
          <Label>Name</Label>
          <Information>{profile?.name}</Information>
          <Label>E-mail</Label>
          <Information>{profile?.email}</Information>
          <Label>Creation date</Label>
          <Information>{profile?.created_at}</Information>
        </Details>

        <LogoutButton onPress={handleLogout} loading={false}>
          Logout
        </LogoutButton>
      </Content>
    </Container>
  );
}
