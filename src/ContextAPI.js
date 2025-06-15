import React, { createContext, useState } from 'react';

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(0);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const PidContext = createContext();
export const PidProvider = ({ children }) => {
  const [pid, setPid] = useState("p0000");

  return (
    <PidContext.Provider value={{ pid, setPid }}>
      {children}
    </PidContext.Provider>
  );
};

export const SearchdataContext = createContext();
export const SearchdataProvider = ({ children }) => {
  const [Searchdata, setSearchdata] = useState([]);

  return (
    <SearchdataContext.Provider value={{ Searchdata, setSearchdata }}>
      {children}
    </SearchdataContext.Provider>
  );
};




