// src/PlayerPage/PlayerScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

import PlayerSearchBar from '../components/PlayerSearchBar';
import PlayerContext from '../components/PlayerContext';


const PlayerScreen = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const players = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axiosInstance.get('/player', {
          params: {
            playerId,
          },
        });

        if (response.status === 200) {
          setPlayer(response.data);
          setCareer(response.data.Careers);
        } else {
          console.error(`Response was not OK`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  useEffect(() => {
    setIsLoading(false);
  }, [player]);

  useEffect(() => {
    let timeout;
    if (showHint) {
      timeout = setTimeout(() => {
        setShowHint(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showHint]);

  const onShowPlayer = async (val) => {
    setShowPlayer(val);
  };

  const handlePlayerSelect = async () => {
    setIsLoading(true);
    setShowPlayer(false);
  };

  if (!player || !players || isLoading) {
    return (
      <div>
        <CssBaseline />
        <Navbar players={players} onPlayerSelect={handlePlayerSelect}/>
        <Container maxWidth="lg">
          <LoadingAnimation />
        </Container>
      </div>
    );
  } else {
    return (
      <div>
          <CssBaseline />
          <Navbar players={players} onPlayerSelect={handlePlayerSelect} />
          <Container maxWidth="lg">
          {player && players && (
              <Container>
                <Box sx={{ marginTop: 2 }} />
                <PlayerSearchBar player={player} players={players} playerScreen={true} handleShowPlayer={onShowPlayer} modalVisible={modalVisible} setModalVisible={setModalVisible} />
              </Container>
          )}
              {showPlayer && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}
                >
                  <PlayerCard player={player} playerScreen={true} />
                </Box>
              )}
              <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}
                >
                  <CareerTable careers={career} />
                </Box>
          </Container>    
      </div>
    );
  }

};

export default PlayerScreen;
