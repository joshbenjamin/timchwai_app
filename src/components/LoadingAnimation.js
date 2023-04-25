import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingAnimation = () => {
  return (
    <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 2,
        }}
    >
        <CircularProgress />
        
    </Box>
  );
};

export default LoadingAnimation;
