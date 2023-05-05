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
import StyledModal from './StyledModal';
import Link from '@mui/material/Link';


const PlayerSearchBar = ({ player, players, playerScreen = false, handleShowPlayer, modalVisible, setModalVisible }) => {
  const [showHint, setShowHint] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const [result, setResult] = useState('info');

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

  useEffect(() => {
    setShowSearchBar(true);
  }, [player]);

  const onInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const getNameBasics = () => {
    if (!players || players.length === 0){
      console.error(`No players to display!`);
    } else {
      return [...new Set(players.map((player) => player.name_basic))];
    }
  }
  
  const handleGuess = () => {
    if (inputValue !== ''){
      if (inputValue.toLowerCase() === player.name_basic.toLowerCase()) {
        setResult('correct');
        handleShowPlayer(true);
        setModalVisible(true);
        setShowSearchBar(false);
      } else {
        setResult('wrong');
        setModalVisible(true);
      }
    }
  };
  
  const handleGiveUp = () => {
    handleShowPlayer(true);
    setShowSearchBar(false);
    // Not going to display anything if give up
    // setResult('info');
    // setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const getResultConfig = () => {
    const config = {
      correct: {
        title: 'Correct',
        message: 'Well done!',
        backgroundColor: '#e0ffe0',
        borderColor: '#0f0',
      },
      wrong: {
        title: 'Wrong',
        message: 'Try again',
        backgroundColor: '#ffe0e0',
        borderColor: '#f00',
      },
      info: {
        title: 'Info',
        message: '',
        backgroundColor: '#ffffff',
        borderColor: '#ccc',
      },
    };

    return config[result] || config['info'];
  };
  

  return (
    <div>
        {showSearchBar && (
          <div>
            <Collapse in={showHint}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Position{player.positions.length > 1 ? 's' : ''}: {player.positions.join(', ')}
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
                  <Button variant="contained" color="success" onClick={handleGuess} sx={{ width: '100%', height: '40px' }}>
                    Guess
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="error" onClick={handleGiveUp} sx={{ width: '100%', height: '40px', whiteSpace: 'nowrap' }}>
                    Give Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {playerScreen && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Link
                  underline="hover"
                  sx={{ cursor: 'pointer' }}
                  onClick={handleGiveUp}
                >
                  <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
                    Show Player
                  </Typography>
                </Link>
              </Box>
            )}
          </div>
        )}
        <StyledModal
          open={modalVisible}
          onClose={handleCloseModal}
          title={getResultConfig().title}
          message={getResultConfig().message}
          backgroundColor={getResultConfig().backgroundColor}
          borderColor={getResultConfig().borderColor}
        />
    </div>
  );
};

export default PlayerSearchBar;
