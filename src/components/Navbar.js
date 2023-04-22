// src/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link to="/timchwai/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div">
              TIMCHWAI
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 0.5 }}>
            <Typography variant="subtitle1" component="div" align="center">
              This Is My Career History, Who Am I?
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
