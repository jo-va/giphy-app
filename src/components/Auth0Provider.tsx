import React, { createContext, useContext, useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

interface Auth0ContextProps {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => void;
}

export const Auth0Context = createContext<Partial<Auth0ContextProps>>({});
export const useAuth0 = () => useContext(Auth0Context);

const Auth0Provider: React.FC<Auth0ClientOptions> = ({ children, ...initOptions }) => {
  const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    (async () => {
      const auth0 = await createAuth0Client(initOptions);
      setAuth0Client(auth0);
      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }
      setLoading(false);
    })();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const loginWithPopup = async (options?: PopupLoginOptions, config?: PopupConfigOptions) => {
    if (!auth0Client) return;
    setLoading(true);
    try {
      await auth0Client.loginWithPopup(options, config);
    } catch (error) {
      console.error(error);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithPopup,
        logout: (...p) => auth0Client && auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
