// src/PlayerPage/PlayerScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import Link from '@mui/material/Link';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PlayerSearchBar from '../components/PlayerSearchBar';
import PlayerContext from '../components/PlayerContext';


const PlayerScreen = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

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
          setPlayer(response.data.player);
          setCareer(response.data.career);
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

  const handleGuess = () => {
    if (inputValue.toLowerCase() === player.name_basic.toLowerCase()) {
      setMessage('Correct!');
      setShowPlayer(true);
    } else {
      setMessage('Wrong guess. Try again!');
    }
    setOpenDialog(true);
  };
  
  const handleGiveUp = () => {
    setMessage(`The correct answer is ${player.name_basic}`);
    setOpenDialog(true);
    setShowPlayer(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

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

            <PlayerSearchBar player={player} players={players} onInputValueChange={handleInputChange} handleGiveUp={handleGiveUp} handleGuess={handleGuess} />

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
            <Container>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Result</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                    Close
                    </Button>
                </DialogActions>
                </Dialog>
            </Container>
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
