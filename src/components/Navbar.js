import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ players, onPlayerSelect = () => {} }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getNames = () => {
    if (!players || players.length === 0) {
      console.error(`No players to display!`);
    } else {
      return players.map(
        (player) => `${player.name_basic} (born ${new Date(player.birth_date).getFullYear()})`
      )
    }
  };

  const handlePlayerSelect = (event, value) => {
    if (!value) {
      console.error('No player selected');
      return;
    }

    const [name_basic, birthYear] = value.split(' (born ');
    const selectedPlayer = players.find((player) => {
      const playerBirthYear = player.birth_date
        ? new Date(player.birth_date).getFullYear()
        : null;
      return (
        player.name_basic === name_basic &&
        (!birthYear || (playerBirthYear && playerBirthYear.toString() === birthYear.slice(0, -1)))
      );
    });

    if (!selectedPlayer) {
      console.error(`Player not found: ${value}`);
      return;
    }

    setShowSearchBox(false);
    onPlayerSelect();

    navigate(`/player/${selectedPlayer.id}`);
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem component={Link} to="/filter">
          <ListItemText primary="Filter" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/">
          <ListItemText primary="Random Player" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/Euro2024">
          <ListItemText primary="Random Euro 2024" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
          <Grid item xs={1}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <IconButton edge="end" color="inherit" aria-label="search" onClick={handleSearchClick}>
                  {showSearchBox ? <CloseIcon /> : <SearchIcon />}
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {showSearchBox && (
        <Paper elevation={3} sx={{ padding: 2, width: '100%', backgroundColor: '#fff' }}>
          <Autocomplete
            options={getNames()}
            getOptionLabel={(name) => name || ''}
            onChange={(event, value) => handlePlayerSelect(event, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for player"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Paper>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Navbar;
