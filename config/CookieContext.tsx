import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from './cookies';

const CookieContext = createContext({
    token: null,
    updateToken: () => {},
    deleteToken: () => {},
  }); // 초기값 설정
  
  export const CookieProvider = ({ children }:any) => {
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const storedToken = getCookie('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
    const updateToken = (newValue:any, options = {}) => {
      setCookie('authToken', newValue, options);
      setToken(newValue);
    };
  
    const deleteToken = (options = {}) => {
      removeCookie('authToken', options);
      setToken(null);
    };
  
    return (
      <CookieContext.Provider value={{ token, updateToken, deleteToken }}>
        {children}
      </CookieContext.Provider>
    );
  };
  
  export const useCookieContext = () => useContext(CookieContext);