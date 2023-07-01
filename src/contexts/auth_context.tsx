import React, { createContext, useEffect, useState } from 'react';
import { getCurrentUserUsingGet } from '../services/UserController';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});

function AuthProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const getCurrentUser = async () => {
    const res = await getCurrentUserUsingGet();
    console.log(res.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
