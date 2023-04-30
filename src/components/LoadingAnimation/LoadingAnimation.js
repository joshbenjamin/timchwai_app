import React from 'react';
import Box from '@mui/material/Box';
import './LoadingAnimation.css';

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
      <div className="mover">
        <img className="spinner" src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Loading" width="100" height="100" />
      </div>
    </Box>
  );
};

export default LoadingAnimation;
