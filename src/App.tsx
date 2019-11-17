import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from './global.styles';
import PrivateRoute from './components/PrivateRoute';
import Search from './components/Search';
import Details from './components/Details';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Selection from './components/Selection';

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 815px;
  height: 100%;
  margin: auto;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <AppContainer>
        <Switch>
          <Route path="/search/:query?" component={Search} />
          <Route path="/gifs/:gifId" component={Details} />
          <Route path="/selection" component={Selection} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="*">
            <Redirect to="/search" />
          </Route>
        </Switch>
      </AppContainer>
    </>
  );
};

export default App;
