import React, { createContext, useState } from 'react';

const loginContext = createContext({
  isLogin: Boolean(),
  setIsLogin: () => {},
});
export function loginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  return (
    <loginContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </loginContext.Provider>
  );
}

export default loginContext;
