import React, { createContext, useState } from 'react';

const loginContext = createContext({
  isLogin: Boolean(),
  setIsLogin: () => {},
  userToken: '',
  setUserToken: () => {},
  UserId: '',
  setUserId: () => {},
});
export function loginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();
  return (
    <loginContext.Provider
      value={{
        isLogin,
        setIsLogin,
      },
    {
      userToken,
      setUserToken,
    },
    {
      userId,
      setUserId,
    }
  }
    >
      {children}
    </loginContext.Provider>
  );
}

export default loginContext;
