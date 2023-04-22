import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const LoadingText = styled(Typography)`
  margin-top: 16px;
`;

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
        <LoadingText>Loading...</LoadingText>
        
    </Box>
  );
};

export default LoadingAnimation;
