import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuth0 } from './Auth0Provider';

type PrivateRouteProps = {
  component: any;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithPopup } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    if (loginWithPopup) {
      (async () => {
        await loginWithPopup();
      })();
    }
  }, [loading, isAuthenticated, loginWithPopup, path]);

  const PrivateComponent = isAuthenticated ? Component : null;

  return <Route path={path} component={PrivateComponent} {...rest} />;
};

export default PrivateRoute;
