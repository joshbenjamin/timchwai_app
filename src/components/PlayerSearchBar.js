// src/PlayerSearchBar.js
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Collapse from '@mui/material/Collapse';
import { Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const PlayerSearchBar = ({ player, players, onInputValueChange, handleGuess, handleGiveUp }) => {
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  const onInputChange = (event, newValue) => {
    setInputValue(newValue);
    onInputValueChange(newValue);
  };

  const onGuessClick = () => {
    if (inputValue !== ''){
      return handleGuess();
    }
  }

  const onGiveUpClick = () => {
    return handleGiveUp();
  }

  const getNameBasics = () => {
    if (!players || players.length === 0){
      console.error(`No players to display!`);
    } else {
      return [...new Set(players.map((player) => player.name_basic))];
    }
  }
  

  return (
    <div>
        <Collapse in={showHint}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Position(s): {player.positions.join(', ')}
            </Typography>
        </Collapse>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxHeight: '50vh', }}>
            <Grid container spacing={1}>
            <Grid item xs={11}>
            <Autocomplete
              autoHighlight={true}
              onInputChange={onInputChange}
              options={getNameBasics()}
              getOptionLabel={(name) => name || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter player name"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <IconButton onClick={() => setShowHint(!showHint)}>
                  <LightbulbIcon />
                </IconButton>
              </Box>
            </Grid>
            </Grid>
        </Box>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={onGuessClick} sx={{ width: '100%', height: '40px' }}>
                Guess
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" onClick={onGiveUpClick} sx={{ width: '100%', height: '40px', whiteSpace: 'nowrap' }}>
                Give Up
              </Button>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
};

export default PlayerSearchBar;
