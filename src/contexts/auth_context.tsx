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
  fetchProcessLoading: boolean;
  setFetchProcessLoading: React.Dispatch<React.SetStateAction<boolean>>;
  localization: string;
  setLocalization: React.Dispatch<React.SetStateAction<string>>;
  setLocalizationAndLoadingFunction: (text: string, open: boolean) => void;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  signout: () => void;
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  errorDescription: string;
  setErrorDescription: React.Dispatch<React.SetStateAction<string>>;
  successDescription: string;
  setSuccessDescription: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType>({
  userInfo: {},
  isAuthenticated: true,
  setIsAuthenticated: () => {},
  fetchLoading: false,
  setFetchLoading: () => {},
  fetchProcessLoading: false,
  setFetchProcessLoading: () => {},
  setLocalizationAndLoadingFunction: () => {},
  localization: '',
  setLocalization: () => {},
  projectName: '',
  setProjectName: () => {},
  login: () => {},
  signout: () => {},
  mode: 'light',
  setMode: () => {},
  errorDescription: '',
  setErrorDescription: () => {},
  successDescription: '',
  setSuccessDescription: () => {},
});

function AuthProvider({ children }: AuthContextProviderProps) {
  const [successDescription, setSuccessDescription] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<API.User>({});
  const [loading, setLoading] = useState<boolean>(true); // add this line
  const [fetchLoading, setFetchLoading] = useState<boolean>(false); // loading for fetch data for GET request
  const [fetchProcessLoading, setFetchProcessLoading] =
    useState<boolean>(false); // loading for fetch data for POST, PUT, DELETE request
  const [localization, setLocalization] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const login = () => {
    window.location.href = `${BASE_URL}/user/login`;
  };

  const signout = () => {
    window.location.href = `${BASE_URL}/user/logout`;
  };

  const setLocalizationAndLoadingFunction = (text: string, open: boolean) => {
    setLocalization(text);
    setFetchProcessLoading(open);
  };

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
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        fetchLoading,
        setFetchLoading,
        fetchProcessLoading,
        setFetchProcessLoading,
        localization,
        setLocalization,
        setLocalizationAndLoadingFunction,
        projectName,
        setProjectName,
        login,
        signout,
        mode,
        setMode,
        errorDescription,
        setErrorDescription,
        successDescription,
        setSuccessDescription,
      }}
    >
      {loading ? <div> </div> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
