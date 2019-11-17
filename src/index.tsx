import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Auth0Provider from './components/Auth0Provider';
import App from './App';
import config from './auth-config.json';

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider domain={config.domain} client_id={config.clientId}>
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();
