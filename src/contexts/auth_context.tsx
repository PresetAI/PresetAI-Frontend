import React, { createContext, useEffect, useState } from 'react';
import { getCurrentUserUsingGet } from '../services/UserController';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: API.User;
};

const AuthContext = createContext<AuthContextType>({
  userInfo: {},
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});

function AuthProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<API.User>({});
  const [loading, setLoading] = useState<boolean>(true); // add this line

  const getCurrentUser = async () => {
    try {
      const res = await getCurrentUserUsingGet();
      if (res.data.code === 200 && res.data.data.googleId !== null) {
        setIsAuthenticated(true);
        setUserInfo(res.data.data);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userInfo }}
    >
      {loading ? <div> </div> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
