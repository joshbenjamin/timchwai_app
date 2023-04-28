import { useEffect, useState } from 'react';
import NameContext from './NameContext';

import axiosInstance from '../axiosInstance';

const NameProvider = ({ children }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchNames() {
      const storedNames = localStorage.getItem('names');

      if (storedNames) {
        setNames(JSON.parse(storedNames));
      } else {
        const response = await axiosInstance.get('/api/player_names/');
        console.log(response.data);
        const names = response.data;
        setNames(names);
        localStorage.setItem('names', JSON.stringify(names));
      }
    }

    fetchNames();
  }, []);

  return (
    <NameContext.Provider value={names}>
      {children}
    </NameContext.Provider>
  );
};

export default NameProvider;