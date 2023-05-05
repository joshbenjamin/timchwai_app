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
            paddingY: 2,
            marginBottom: 1,
            marginTop: 1,
            backgroundColor: '#f6f6f6',
            borderRadius: '10px',
            boxShadow: '0 1px 2px 1px rgba(0, 0, 0, .4)',
        }}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={generateClick}
                sx={{ 
                  mr: 1,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px 2px rgba(0, 0, 0, .2)',
                  padding: '4px 8px',
                  minHeight: '40px',
                  fontSize: '1rem'
                }}
            >
                Get Random Player
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={filterClick}
                sx={{ 
                  minWidth: 'max-content',
                  boxShadow: '0 2px 4px 2px rgba(0, 0, 0, .2)',
                  padding: '4px 8px',
                  minHeight: '40px',
                  fontSize: '1rem'
                }}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
        </Box>
    </AppBar>
  );
};

export default GeneratePlayerBar;