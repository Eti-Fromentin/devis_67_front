import React, { createContext, useState } from 'react';
import axios from 'axios';

const LoginContext = createContext({
  isLogin: Boolean(),
  setIsLogin: () => {},
  userToken: '',
  setUserToken: () => {},
  userId: '',
  setUserId: () => {},
  registerLogin: () => {},
  checkisLogin: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
});

export function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function registerLogin(account) {
    window.localStorage.setItem('devisAccessToken', account.headers.accesstoken);
    window.localStorage.setItem('devisUserId', account.data.userId);
    setUserToken(account.headers.accesstoken);
    setUserId(account.data.userId);
    setIsLogin(true);
  }

  function getUserData() {
    axios({
      method: 'get',
      url: `${apiUrl}/user/${userId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.data)
      .then((data) => setUserData(data));
  }

  function checkIsLogin() {
    if (window.localStorage.getItem('devisUserId') !== null) {
      const token = window.localStorage.getItem('devisAccessToken');
      const id = window.localStorage.getItem('devisUserId');
      setUserToken(token);
      setUserId(id);
      setIsLogin(true);
      getUserData;
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
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
