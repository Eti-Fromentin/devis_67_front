import React, { createContext, useState } from 'react';

const LoginContext = createContext({
  isLogin: Boolean(),
  setIsLogin: () => {},
  userToken: '',
  setUserToken: () => {},
  userId: '',
  setUserId: () => {},
  registerLogin: () => {},
  checkisLogin: () => {},
});
export function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();

  function registerLogin(account) {
    window.localStorage.setItem('devisAccessToken', account.headers.accesstoken);
    window.localStorage.setItem('devisUserId', account.data.userId);
    setUserToken(account.headers.accesstoken);
    setUserId(account.data.userId);
    setIsLogin(true);
  }

  function checkIsLogin() {
    if (window.localStorage.getItem('devisUserId') !== null) {
      const token = window.localStorage.getItem('devisAccessToken');
      const id = window.localStorage.getItem('devisUserId');
      setUserToken(token);
      setUserId(id);
      setIsLogin(true);
    }
  }

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userToken,
        setUserToken,
        userId,
        setUserId,
        registerLogin,
        checkIsLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
