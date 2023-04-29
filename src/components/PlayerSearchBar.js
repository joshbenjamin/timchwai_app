// src/PlayerSearchBar.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Collapse from '@mui/material/Collapse';
import { Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const PlayerSearchBar = ({ player, playerNames, onInputValueChange }) => {
  const [showHint, setShowHint] = useState(false);
  const [autoCompletePlayer, setAutoCompletePlayer] = useState(null);

  const onInputChange = (event, newValue) => {
    onInputValueChange(newValue);
    if (playerNames.includes(newValue)){
      setAutoCompletePlayer(newValue);
    } else {
      setAutoCompletePlayer(null);
    }
  };

  const autoCompleteFilterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => (option && option.length >= 2 ? option : ''),
  });

  return (
    <div>
        <Collapse in={showHint}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Position(s): {player.positions.join(', ')}
            </Typography>
        </Collapse>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Grid container spacing={1}>
            <Grid item xs={10}>
                <Autocomplete
                    value={autoCompletePlayer}
                    onInputChange={onInputChange}
                    options={playerNames}
                    getOptionLabel={(player) => player || ''}
                    filterOptions={autoCompleteFilterOptions}
                    isOptionEqualToValue={(option, value) => option === value}
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
            <Grid item xs={2}>
                <IconButton onClick={() => setShowHint(!showHint)}>
                <LightbulbIcon />
                </IconButton>
            </Grid>
            </Grid>
        </Box>
    </div>
  );
};

export default PlayerSearchBar;
