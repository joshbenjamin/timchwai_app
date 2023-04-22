// src/App.js
import React from 'react';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Typography>
          Tester
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
