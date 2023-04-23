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
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Collapse from '@mui/material/Collapse';


import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


const PlayerScreen = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const [showHint, setShowHint] = useState(false);


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
    setGuessCount(guessCount + 1);
    if (inputValue.toLowerCase() === player.name_basic.toLowerCase()) {
      setMessage('Correct!');
      setShowPlayer(true);
    } else if(player.name_basic.toLowerCase().includes(inputValue.toLowerCase())) {
      setMessage("This is part of the player's name!");
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
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
            <Collapse in={showHint}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Position(s): {player.positions.join(', ')}
              </Typography>
            </Collapse>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    label="Enter player name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                      onClick={() => setShowHint(!showHint)}
                    >
                      <LightbulbIcon />
                    </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" onClick={handleGuess} sx={{ width: '100%', height: '40px' }}>
                    Guess
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="secondary" onClick={handleGiveUp} sx={{ width: '100%', height: '40px', whiteSpace: 'nowrap' }}>
                    Give Up
                  </Button>
                </Grid>
              </Grid>
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
            <Container>
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
