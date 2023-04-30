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


const PlayerSearchBar = ({ player, players, onInputValueChange }) => {
  const [showHint, setShowHint] = useState(false);

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
    onInputValueChange(newValue);
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
    </div>
  );
};

export default PlayerSearchBar;
