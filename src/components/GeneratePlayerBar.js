// src/GeneratePlayerBar.js
import React from 'react';
import { AppBar, Box, Button } from '@mui/material';

const GeneratePlayerBar = ({ handleRandomPlayerButtonClick, handleFilterButtonClick, showFilters }) => {

  const generateClick = () => { 
    handleRandomPlayerButtonClick();
  }

  const filterClick = () => {
    handleFilterButtonClick();
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: 'transparent' }}>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 1,
            marginBottom: 2,
            marginTop: 2,
            backgroundColor: 'white'
        }}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={generateClick}
                sx={{ mr: 3, whiteSpace: 'nowrap' }}
            >
                Generate Player
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={filterClick}
                sx={{ minWidth: 'max-content' }}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
        </Box>
    </AppBar>
  );
};

export default GeneratePlayerBar;