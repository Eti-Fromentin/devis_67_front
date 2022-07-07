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
  checkIsLogin: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
  logOut: () => {},
  registerAdminLogin: () => {},
  checkIsAdminLogin: () => {},
  isAdminLogin: Boolean(),
  adminToken: '',
});

export function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminToken, setAdminToken] = useState();
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
    userId &&
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
      console.log('logIn');
      // getUserData();
    }
  }

  function registerAdminLogin(account) {
    window.localStorage.setItem('devisAdminToken', account.headers.accesstoken);
    window.localStorage.setItem('devisAdminId', account.data.userId);
    setAdminToken(account.headers.accesstoken);
    setUserId(account.data.userId);
    setIsAdminLogin(true);
  }

  function checkIsAdminLogin() {
    if (window.localStorage.getItem('devisAdminId') !== null) {
      const token = window.localStorage.getItem('devisAdminToken');
      const id = window.localStorage.getItem('devisAdminId');
      setAdminToken(token);
      setUserId(id);
      setIsLogin(true);
      return true;
    } else return false;
  }

  function logOut() {
    console.log('logout');
    setUserToken(null);
    setUserId(null);
    setIsLogin(false);
    window.localStorage.removeItem('devisAccessToken');
    window.localStorage.removeItem('devisUserId');
    window.localStorage.removeItem('devisAdminToken');
    window.localStorage.removeItem('devisAdminId');
    setUserData(null);
    setIsAdminLogin(null);
    setAdminToken(null);
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
        logOut,
        registerAdminLogin,
        checkIsAdminLogin,
        isAdminLogin,
        adminToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
