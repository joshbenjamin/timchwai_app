// src/PlayerPage/PlayerScreen.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation';
import Link from '@mui/material/Link';


import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


import colors from '../components/colors';

const PlayerScreen = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [messageState, setMessageState] = useState('info');

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

  const handleGuess = () => {
    setGuessCount(guessCount + 1);
    if (inputValue.toLowerCase() === player.name_basic.toLowerCase()) {
      setMessage('Correct!');
      setMessageState('success');
      setShowPlayer(true);
    } else if(player.name_basic.toLowerCase().includes(inputValue.toLowerCase())) {
      setMessage("This is part of the player's name!");
      setMessageState('close');
    } else {
      setMessageState('error');
      setMessage('Wrong guess. Try again!');
    }
    setOpenDialog(true);
  };
  
  const handleGiveUp = () => {
    setMessage(`The correct answer is ${player.name_basic}`);
    setMessageState('info');
    setOpenDialog(true);
    setShowPlayer(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };
  
  const getStylesBasedOnMessageState = (messageState) => {
    switch (messageState) {
      case 'success':
        return { backgroundColor: colors.success_bg, color: colors.result_text };
      case 'error':
        return { backgroundColor: colors.close_bg, color: colors.result_text };
      case 'close':
        return { backgroundColor: colors.error_bg, color: colors.result_text };
      case 'info':
      default:
        return { backgroundColor: colors.info_bg, color: colors.info_text };
    }
  };

  if (!player) {
    return <LoadingAnimation />;
  }

  return (
    <div>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg">
        {player && career && !showPlayer && (
            <Container>
            <Box sx={{ marginTop: 2 }} />
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                value={inputValue}
                onChange={handleInputChange}
                label="Enter name"
                variant="outlined"
                sx={{ marginRight: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleGuess} sx={{ marginRight: 1 }}>
                Guess
                </Button>
                <Button variant="contained" color="secondary" onClick={handleGiveUp}>
                Give Up
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {message && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {message}
                </Typography>
                )}
                {guessCount > 0 && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Number of guesses: {guessCount}
                </Typography>
                )}
            </Box>
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
            <Container sx={{
                    ...getStylesBasedOnMessageState(messageState)
                }}>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Result</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    {guessCount > 0 && (
                    <Typography
                        variant="body1"
                    >
                        Number of guesses: {guessCount}
                    </Typography>
                    )}
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
