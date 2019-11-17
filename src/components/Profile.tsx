import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from './Auth0Provider';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileItem = styled.div`
  margin: 10px;
`;

const Title = styled.h1``;

const Profile: React.FC = () => {
  const { user = { name: '', email: '', picture: '' } } = useAuth0();

  return (
    <ProfileContainer>
      <Title>Profile</Title>
      <ProfileItem>{user && user.name}</ProfileItem>
      <ProfileItem>{user && user.email}</ProfileItem>
      <ProfileItem>{user && <img src={user.picture} alt="Profile" />}</ProfileItem>
    </ProfileContainer>
  );
};

export default Profile;
