import React, { useCallback, useEffect, useState, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axiosInstance from '../axiosInstance';

import LeagueCard from '../components/LeagueCard';
import LeagueSeasonCard from '../components/LeagueSeasonCard';
import TeamCard from '../components/TeamCard';
import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';

import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import GeneratePlayerBar from '../components/GeneratePlayerBar';
import PlayerSearchBar from '../components/PlayerSearchBar';

import PlayerContext from '../components/PlayerContext';


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

  const leagueSeasonsRef = useRef(null);
  const teamsRef = useRef(null);

  const players = useContext(PlayerContext);

  const fetchLeagues = async () => {
    console.log('Fetching leagues for TIMCHWAI');
    try {
        const response = await axiosInstance.get('/api/leagues_with_seasons/');
        if (response.status !== 200){
            console.error('Error');
        }
        // console.log(`Leagues:\n${JSON.stringify(response.data)}`);
        setLeagues(response.data);
    } catch (error) {
        console.error(`Error fetching leagues: ${error}`);
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
        // console.log(`League Seasons:\n${JSON.stringify(response.data)}`);
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
        // console.log(`Teams:\n${JSON.stringify(response.data)}`);
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
        if (leagueSeasonsRef.current) {
          leagueSeasonsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        setSelectedLeagues([]);
    }
  };

  const handleSelectAllLeagueSeasons = () => {
    setSelectAllLeagueSeasons(!selectAllLeagueSeasons);
    if (!selectAllLeagueSeasons) {
        setSelectedLeagueSeasons(leagueSeasons.map((leagueSeason) => leagueSeason.id));
        if (teamsRef.current) {
          teamsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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

  const onShowPlayer = async (val) => {
    setShowPlayer(val);
  }

  const handleRandomPlayerButtonClick = async () => {
    setPlayer({});
    setCareer({});
    setShowPlayer(false);
    setShowCareer(false);
    setShowFilters(false);
    setLoadingPlayer(true);

    try {
      const response = await axiosInstance.get('/api/player_in_team_seasons', {
          params: {
              leagueSeasonIds: selectedLeagueSeasons.join(','),
              teamIds: selectedTeams.join(','),
          },
      });

      if (response.status === 200){
        setPlayer(response.data);
        setCareer(response.data.Careers);
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

  return (
    <div>
      <CssBaseline />
      <Navbar players={players}/>
      <Container maxWidth="lg">
        {selectedTeams.length > 0 && (
          <GeneratePlayerBar handleRandomPlayerButtonClick={handleRandomPlayerButtonClick} handleFilterButtonClick={handleFilterButtonClick} showFilters={showFilters} />
        )}
        <Box sx={{ flexGrow: 1, p: 1 }}>

        {leagues.length > 0 && showFilters && (
                <Container className='leagues'>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Leagues
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, marginTop: 2 }}>
                    <Typography variant='subtitle1' paddingRight='10px' sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>
                    {selectedLeagues.length} selected
                    </Typography>
                    <FormControlLabel
                    control={<Checkbox checked={selectAllLeagues} onChange={handleSelectAllLeagues} />}
                    label={<Typography variant="subtitle1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>Select All</Typography>}
                    />
                    <Button variant="contained" color="info" onClick={toggleLeaguesCollapse} size="small" sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                    }}>
                      {showLeagues ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                {showLeagues && (
                    <Grid container spacing={2} justifyContent="center">
                    {leagues.map((league) => (
                        <Grid item xs={6} sm={4} md={3} lg={3} key={league.id}>
                        <LeagueCard league={league} onLeagueClick={onLeagueClick} isSelected={selectedLeagues.includes(league.id)} />
                        </Grid>
                    ))}
                    </Grid>
                )}
                </Container>
            )}

            {leagues.length === 0 && (
                <LoadingAnimation />
            )}
            
            {leagueSeasons.length > 0 && showFilters && (
                <Container className='league_seasons' ref={leagueSeasonsRef}>
                <Box sx={{ marginTop: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    League Seasons
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Typography variant='subtitle1' paddingRight='10px' sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>
                        {selectedLeagueSeasons.length} selected
                    </Typography>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={selectAllLeagueSeasons}
                        onChange={handleSelectAllLeagueSeasons}
                        />
                    }
                    label={<Typography variant="subtitle1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>Select All</Typography>}
                    />
                    <Button variant="contained" color="info" onClick={toggleLeagueSeasonsCollapse} size="small" sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                    }}>
                      {showLeagueSeasons ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                {showLeagueSeasons && (
                    <Grid container spacing={2} justifyContent="center">
                    {leagueSeasons.map((leagueSeason) => (
                        <Grid item xs={6} sm={4} md={3} lg={3} key={leagueSeason.id}>
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

            {leagueSeasons.length === 0 && selectedLeagues.length > 0 && (
                <LoadingAnimation />
            )}

            {teams.length > 0 && showFilters && (
                <Container className='teams' ref={teamsRef}>
                <Box sx={{ marginTop: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Teams
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
                  <Typography variant='subtitle1' paddingRight='10px' sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>
                    {selectedTeams.length} selected
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAllTeams}
                        onChange={handleSelectAllTeams}
                      />
                    }
                    label={<Typography variant="subtitle1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>Select All</Typography>}
                  />
                  <Button variant="contained" color="info" onClick={toggleTeamsCollapse} size="small" sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                  }}>
                    {showTeams ? 'Collapse' : 'Expand'}
                  </Button>
                </Box>

                {showTeams && (
                    <Grid container spacing={2} justifyContent="center">
                    {teams.map((team) => (
                        <Grid item xs={3} sm={3} md={2} key={team.id}>
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

            {teams.length === 0 && selectedLeagueSeasons.length > 0 && selectedLeagues.length > 0 && (
                <LoadingAnimation />
            )}
            
            {selectedTeams.length > 0 && (
                <Container className='player'>                
                  {loadingPlayer && (
                      <LoadingAnimation />
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

            {player && career && showCareer && !showPlayer && (
              <PlayerSearchBar player={player} players={players} handleShowPlayer={onShowPlayer} />
            )}

            {career && showCareer && (
              <CareerTable careers={career} />
            )}
        </Box>
      </Container>
    </div>
  )
}

export default TIMCHWAISCREEN;
