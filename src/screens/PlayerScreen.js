// src/PlayerPage/PlayerScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import Link from '@mui/material/Link';

import PlayerSearchBar from '../components/PlayerSearchBar';
import PlayerContext from '../components/PlayerContext';


const PlayerScreen = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState([]);

  const [showHint, setShowHint] = useState(false);

  const players = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axiosInstance.get('/api/player', {
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
  }

  if (!player || !players) {
    return (
      <div>
        <CssBaseline />
        <Navbar players={players} />
        <Container maxWidth="lg">
          <LoadingAnimation />
        </Container>
      </div>
    );
  }

  return (
    <div>
        <CssBaseline />
        <Navbar players={players} />
        <Container maxWidth="lg">
        {player && career && !showPlayer && (
            <Container>
              <Box sx={{ marginTop: 2 }} />

              <PlayerSearchBar player={player} players={players} handleShowPlayer={onShowPlayer} />

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {!showPlayer && (
                  <Link
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowPlayer(true);
                    }}
                  >
                    <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
                      Show Player
                    </Typography>
                  </Link>
                )}
              </Box>
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
};

export default PlayerScreen;
