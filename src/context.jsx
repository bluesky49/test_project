import { createContext, useState } from 'react';
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [active, setActive] = useState(0);
  const [docu, setDocu] = useState([]);

  return (
    <DataContext.Provider value={{ active, docu, setActive, setDocu }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };