// src/Content.js
import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axiosInstance from '../axiosInstance';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import LeagueCard from '../components/LeagueCard';
import LeagueSeasonCard from '../components/LeagueSeasonCard';
import TeamCard from '../components/TeamCard';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';

import colors from '../components/colors';

import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation';

const TIMCHWAISCREEN = () => {
  const [showFilters, setShowFilters] = useState(true);

  const [leagues, setLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectAllLeagues, setSelectAllLeagues] = useState(false);

  const [leagueSeasons, setLeagueSeasons] = useState([]);
  const [selectedLeagueSeasons, setSelectedLeagueSeasons] = useState([]);
  const [selectAllLeagueSeasons, setSelectAllLeagueSeasons] = useState(false);

  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectAllTeams, setSelectAllTeams] = useState(false);

  const [showLeagues, setShowLeagues] = useState(true);
  const [showLeagueSeasons, setShowLeagueSeasons] = useState(true);
  const [showTeams, setShowTeams] = useState(true);

  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState(null);
  const [showCareer, setShowCareer] = useState(true);
  const [loadingPlayer, setLoadingPlayer] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [messageState, setMessageState] = useState('info');

  const fetchLeagues = async () => {
    console.log('Fetching leagues for TIMCHWAI');
    try {
        const response = await axiosInstance.get('/api/leagues/');
        if (response.status !== 200){
            console.error('Error');
        }
        console.log(response);
        console.log(`Leagues:\n${JSON.stringify(response.data)}`);
        setLeagues(response.data);
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
  };

  const fetchLeagueSeasons = useCallback(
    async (selectedLeagues) => {
      try {
        const response = await axiosInstance.get('/api/league_seasons', {
          params: {
            leagueIds: selectedLeagues.join(','),
          },
        });
        console.log(`League Seasons:\n${JSON.stringify(response.data)}`);
        setLeagueSeasons(response.data);
      } catch (error) {
        console.error('Error fetching league seasons:', error);
      }
    },
    [setLeagueSeasons]
  );
  
  const fetchTeams = useCallback(
    async (selectedLeagueSeasons) => {
      try {
        const response = await axiosInstance.get('/api/teams_in_seasons', {
          params: {
            leagueSeasonIds: selectedLeagueSeasons.join(','),
          },
        });
        console.log(`Teams:\n${JSON.stringify(response.data)}`);
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    },
    [setTeams]
  );

  // Effects

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagueSeasons.length) {
      fetchTeams(selectedLeagueSeasons);
    }
  }, [selectedLeagueSeasons, fetchTeams]);

  useEffect(() => {
    if (selectedLeagues.length) {
      fetchLeagueSeasons(selectedLeagues);
    }
  }, [selectedLeagues, fetchLeagueSeasons]);

  // Select

  const handleSelectAllLeagues = () => {
    setSelectAllLeagues(!selectAllLeagues);
    if (!selectAllLeagues) {
        setSelectedLeagues(leagues.map((league) => league.id));
    } else {
        setSelectedLeagues([]);
    }
  };

  const handleSelectAllLeagueSeasons = () => {
    setSelectAllLeagueSeasons(!selectAllLeagueSeasons);
    if (!selectAllLeagueSeasons) {
        setSelectedLeagueSeasons(leagueSeasons.map((leagueSeason) => leagueSeason.id));
    } else {
        setSelectedLeagueSeasons([]);
    }
  };

  const handleSelectAllTeams = () => {
    setSelectAllTeams(!selectAllTeams);
    if (!selectAllTeams) {
        setSelectedTeams(teams.map((team) => team.id));
    } else {
        setSelectedTeams([]);
    }
  };

  // Click

  const onLeagueClick = (leagueId) => {
    if (selectedLeagues.includes(leagueId)) {
        let newselLgs = selectedLeagues.filter((id) => id !== leagueId)
        setSelectedLeagues(newselLgs);
        if (newselLgs.length){
          fetchLeagueSeasons(newselLgs);
        } else {
          setLeagueSeasons([]);
          setSelectedLeagueSeasons([]);
          setSelectAllLeagueSeasons(false);

          setTeams([]);
          setSelectedTeams([]);
          setSelectAllTeams(false);
        }
    } else {
        setSelectedLeagues([...selectedLeagues, leagueId]);
    }
    setSelectAllLeagues(false);
  };

  const onLeagueSeasonClick = (leagueSeasonId) => {
    if (selectedLeagueSeasons.includes(leagueSeasonId)) {
      let selectls = selectedLeagueSeasons.filter((id) => id !== leagueSeasonId)
        setSelectedLeagueSeasons(selectls);
        if(selectls.length){
          fetchTeams(selectls);
        } else {
          setTeams([]);
          setSelectedTeams([]);
          setSelectAllTeams(false);
        }
    } else {
        setSelectedLeagueSeasons([...selectedLeagueSeasons, leagueSeasonId]);
    }
    setSelectAllLeagueSeasons(false);
  };

  const onTeamClick = (teamId) => {
    if (selectedTeams.includes(teamId)){
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
    setSelectAllTeams(false);
  };

  // Toggle

  const toggleLeaguesCollapse = () => {
    setShowLeagues(!showLeagues);
  };

  const toggleLeagueSeasonsCollapse = () => {
    setShowLeagueSeasons(!showLeagueSeasons);
  };

  const toggleTeamsCollapse = () => {
    setShowTeams(!showTeams);
  };

  // Player

  const handleRandomPlayerButtonClick = async () => {
    setPlayer({});
    setCareer({});
    setShowPlayer(false);
    setShowCareer(false);
    setLoadingPlayer(true);
    setInputValue('');
    setMessage('');

    try {
      const response = await axiosInstance.get('/api/player_in_team_seasons', {
          params: {
              leagueSeasonIds: selectedLeagueSeasons.join(','),
              teamIds: selectedTeams.join(','),
          },
      });
      // const response = await axiosInstance.get('/api/player', {
      //   params: {
      //     playerId: 1
      //   },
      // });

      if (response.status === 200){
        setPlayer(response.data.player);
        setCareer(response.data.career);
        setGuessCount(0);
        setShowCareer(true);
        setShowPlayer(false);
        setShowFilters(false);
        setLoadingPlayer(false);
      } else {
        console.error(`Response was not OK`)
      }
    } catch (error) {
        console.error(error);
    }
};

const handleFilterButtonClick = async () => {
  try {
    setShowFilters(!showFilters);
  } catch (error) {
    console.log(error);
  }
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const handleGuess = () => {
  setGuessCount(guessCount + 1);
  if (inputValue.toLowerCase() === player.name_basic.toLowerCase()) {
    setMessage('Correct!');
    setMessageState('success');
    setShowPlayer(true);
  } else if(player.name_basic.toLowerCase().includes(inputValue.toLowerCase())) {
    setMessage("This is part of the player's name!");
    setMessageState('close');
  } else {
    setMessageState('error');
    setMessage('Wrong guess. Try again!');
  }
  setOpenDialog(true);
};

const handleGiveUp = () => {
  setMessage(`The correct answer is ${player.name_basic}`);
  setMessageState('info');
  setOpenDialog(true);
  setShowPlayer(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};

const getStylesBasedOnMessageState = (messageState) => {
  switch (messageState) {
    case 'success':
      return { backgroundColor: colors.success_bg, color: colors.result_text };
    case 'error':
      return { backgroundColor: colors.close_bg, color: colors.result_text };
    case 'close':
      return { backgroundColor: colors.error_bg, color: colors.result_text };
    case 'info':
    default:
      return { backgroundColor: colors.info_bg, color: colors.info_text };
  }
};

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, p: 1 }}>
            {selectedTeams.length > 0 && (
                <Container className='player'>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                    }}
                >
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRandomPlayerButtonClick}
                    sx={{mr: 3}}
                    >
                    Generate Player
                    </Button>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFilterButtonClick}
                    >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                </Box>
                
                {loadingPlayer && (
                    <LoadingAnimation />
                )}

                {career && showCareer && (
                    <CareerTable careers={career} />
                )}

                {player && showPlayer && (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <PlayerCard player={player} />
                    </Box>
                )}
                </Container>
            )}

            {player && career && showCareer && (
                <Container>
                <Box sx={{ marginTop: 2 }} />
                <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    label="Enter player name"
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleGuess} sx={{ marginRight: 1 }}>
                    Guess
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleGiveUp}>
                    Give Up
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {message && (
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {message}
                    </Typography>
                    )}
                    {guessCount > 0 && (
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        Number of guesses: {guessCount}
                    </Typography>
                    )}
                </Box>
                <Container sx={{
                        ...getStylesBasedOnMessageState(messageState)
                    }}>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Result</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{message}</DialogContentText>
                        {guessCount > 0 && (
                        <Typography
                            variant="body1"
                        >
                            Number of guesses: {guessCount}
                        </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                    </Dialog>
                </Container>
                </Container>
            )}

            {leagues.length > 0 && showLeagues && showFilters && (
                <Container className='leagues' maxWidth="md">
                <Box sx={{ marginTop: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Leagues
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, marginTop: 2 }}>
                    <Typography variant='h6' paddingRight='10px'>
                    {selectedLeagues.length} selected
                    </Typography>
                    <FormControlLabel
                    control={<Checkbox checked={selectAllLeagues} onChange={handleSelectAllLeagues} />}
                    label="Select All"
                    />
                    <Button variant="contained" color="primary" onClick={toggleLeaguesCollapse}>
                    {showLeagues ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                {showLeagues && (
                    <Grid container spacing={2} justifyContent="center">
                    {leagues.map((league) => (
                        <Grid item xs={12} sm={6} key={league.id}>
                        <LeagueCard league={league} onLeagueClick={onLeagueClick} isSelected={selectedLeagues.includes(league.id)} />
                        </Grid>
                    ))}
                    </Grid>
                )}
                </Container>
            )}

            {leagues === [] && (
                <LoadingAnimation />
            )}
            
            {leagueSeasons.length > 0 && showFilters && (
                <Container className='league_seasons' maxWidth='md'>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    League Seasons
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Typography variant='h6' paddingRight='10px'>
                        {selectedLeagueSeasons.length} selected
                    </Typography>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={selectAllLeagueSeasons}
                        onChange={handleSelectAllLeagueSeasons}
                        />
                    }
                    label="Select All"
                    />
                    <Button variant="contained" color="primary" onClick={toggleLeagueSeasonsCollapse}>
                    {showLeagueSeasons ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                {showLeagueSeasons && (
                    <Grid container spacing={2} justifyContent="center">
                    {leagueSeasons.map((leagueSeason) => (
                        <Grid item xs={12} sm={6} key={leagueSeason.id}>
                            <LeagueSeasonCard
                                leagueSeason={leagueSeason}
                                onLeagueSeasonClick={onLeagueSeasonClick}
                                isSelected={selectedLeagueSeasons.includes(leagueSeason.id)}
                            />
                        </Grid>
                    ))}
                    </Grid>
                )}
                </Container>
            )}

            {leagueSeasons === [] && leagues !== [] && (
                <LoadingAnimation />
            )}

            {teams.length > 0 && showFilters && (
                <Container className='teams' maxWidth='md'>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Teams
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h6' paddingRight='10px'>
                    {selectedTeams.length} selected
                    </Typography>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={selectAllTeams}
                        onChange={handleSelectAllTeams}
                        />
                    }
                    label="Select All"
                    />
                    <Button variant="contained" color="primary" onClick={toggleTeamsCollapse}>
                    {showTeams ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                {showTeams && (
                    <Grid container spacing={2} justifyContent="center">
                    {teams.map((team) => (
                        <Grid item xs={12} sm={4} md={3} key={team.id}>
                        <TeamCard
                            team={team}
                            onTeamClick={onTeamClick}
                            isSelected={selectedTeams.includes(team.id)}
                        />
                        </Grid>
                    ))}
                    </Grid>
                )}
                </Container>
            )}

            {teams === [] && leagueSeasons !== [] && leagues !== [] && (
                <LoadingAnimation />
            )}
        </Box>
      </Container>
    </div>
  )
}

export default TIMCHWAISCREEN;
