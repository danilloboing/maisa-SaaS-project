import { createContext, useState } from 'react';

import { AuthContextValues, LoginData, UserInfo } from '@/types/auth';
import { loginQuerie, removeUserInfos } from '@/queries/auth';
import { ContextProps } from '@/types/context';
import { useToast } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '@/constants/private-routes';

export const AuthContext = createContext<AuthContextValues | null>(null);

export function AuthContextProvider({ children }: ContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { successToast, errorToast } = useToast();

  async function onLogoutHandler() {
    try {
      removeUserInfos();
      setIsAuthenticated(false);
      setLoggedInUser(null);
      setUserInfo(null);
    } catch (error) {
      errorToast('Erro ao fazer logout');
    }
  }

  async function onLoginHandler(data: LoginData) {
    setIsLoading(true);

    const { access_token, success, user, message } = await loginQuerie(data);

    if (success) {
      localStorage.setItem('token', access_token);
      setUserDataFn(user);
      setIsAuthenticated(true);
      setLoggedInUser(true);
      successToast('Login realizado com sucesso');
    } else {
      errorToast(message);
    }
    setIsLoading(false);
  }

  function setUserDataFn(data: UserInfo) {
    setUserInfo(data);
    try {
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      return error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLoading,
        isAuthenticated,
        loggedInUser,
        onLogoutHandler,
        onLoginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
