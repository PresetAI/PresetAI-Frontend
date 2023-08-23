import React, { createContext, useEffect, useState } from 'react';
import { getCurrentUserUsingGet } from '../services/UserController';
import { BASE_URL } from '@/config/domain';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: API.User;
  fetchLoading: boolean;
  setFetchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userInfo: {},
  isAuthenticated: true,
  setIsAuthenticated: () => {},
  fetchLoading: false,
  setFetchLoading: () => {},
  projectName: '',
  setProjectName: () => {},
  login: () => {},
  signout: () => {},
});

function AuthProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<API.User>({});
  const [loading, setLoading] = useState<boolean>(true); // add this line
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  const login = () => {
    window.location.href = `${BASE_URL}/user/login`;
  };

  const signout = () => {
    window.location.href = `${BASE_URL}/user/logout`;
  };

  const getCurrentUser = async () => {
    try {
      const res = await getCurrentUserUsingGet();
      if (res.data.code === 200 && res.data.data.googleId !== null) {
        setIsAuthenticated(true);
        setUserInfo(res.data.data);
        console.log(res.data.data);
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
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        fetchLoading,
        setFetchLoading,
        projectName,
        setProjectName,
        login,
        signout,
      }}
    >
      {loading ? <div> </div> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
