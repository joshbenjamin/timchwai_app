import { useEffect, useState } from 'react';
import PlayersContext from './PlayerContext';

import axiosInstance from '../axiosInstance';

const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      const storedPlayers = localStorage.getItem('players');

      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      } else {
        const response = await axiosInstance.get('/players');
        const players = response.data;
        setPlayers(players);
        localStorage.setItem('players', JSON.stringify(players));
      }
    }

    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayerProvider;