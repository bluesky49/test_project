import { createContext, useState } from 'react';
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [active, setActive] = useState(0);
  const [docu, setDocu] = useState([]);
  const [drawer, setDrawer] = useState(false);

  return (
    <DataContext.Provider value={{ active, docu, drawer, setActive, setDocu, setDrawer }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };