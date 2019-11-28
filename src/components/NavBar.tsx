import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from './Auth0Provider';

const NavBarContainer = styled.header`
  width: 100%;
  height: 50px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const NavBarSection = styled.div`
  display: flex;
  align-items: center;
`;

const NavBarLink = styled(Link)`
  color: white;
  margin: 0 10px;
`;

const AuthButton = styled.button`
  height: 100%;
  background: none;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const Username = styled.span`
  margin: 0 10px;
`;

const ProfilePic = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 0 px;
`;

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL;

const NavBar: React.FC = () => {
  const {
    isAuthenticated,
    loginWithPopup = () => {},
    logout = () => {},
    user = { name: '', picture: '' },
  } = useAuth0();
  return (
    <NavBarContainer>
      <NavBarSection>
        <NavBarLink to="/">Search Gifs</NavBarLink>
        <NavBarLink to="/profile">Profile</NavBarLink>
      </NavBarSection>
      <NavBarSection>
        {!isAuthenticated ? <AuthButton onClick={() => loginWithPopup()}>Login</AuthButton> : null}
        {isAuthenticated ? (
          <>
            <Username>{user && user.name}</Username>
            {user && user.picture ? <ProfilePic src={user.picture} alt="Profile" /> : null}
            <AuthButton onClick={() => logout({ returnTo: BASE_URL })}>Logout</AuthButton>
          </>
        ) : null}
      </NavBarSection>
    </NavBarContainer>
  );
};

export default NavBar;
