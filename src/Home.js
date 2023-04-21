// src/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Modal, Collapse } from 'react-bootstrap';
import axiosInstance from './axiosInstance';

import LeagueCard from './components/Bootstrap/LeagueCard';
import LeagueSeasonCard from './components/Bootstrap/LeagueSeasonCard';
import TeamCard from './components/Bootstrap/TeamCard';


// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {
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


  const [showModal, setShowModal] = useState(false);

  const [player, setPlayer] = useState({});
  const [career, setCareer] = useState([]);

  const fetchLeagues = async () => {
    try {
        const response = await axiosInstance.get('/api/leagues/');
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
        const response = await axiosInstance.get('/api/teams', {
          params: {
            leagueSeasonIds: selectedLeagueSeasons.join(','),
          },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    },
    [setTeams]
  );


  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagues && selectedLeagues.length > 0) {
      fetchLeagueSeasons(selectedLeagues);
    } else {
      setLeagueSeasons([]);
      setSelectedLeagueSeasons([]);
    }
  }, [selectedLeagues, fetchLeagueSeasons]); // Add fetchLeagueSeasons here
  
  useEffect(() => {
    if (selectedLeagueSeasons && selectedLeagueSeasons.length > 0) {
      fetchTeams(selectedLeagueSeasons);
    } else {
      setTeams([]);
      setSelectedTeams([]);
    }
  }, [selectedLeagueSeasons, fetchTeams]); // Add fetchTeams here



  const handleLeagueChange = async (leagueId, wasChecked) => {
    if (wasChecked){
      setSelectedLeagues(selectedLeagues.filter((id) => id !== leagueId));
    } else {
      setSelectedLeagues([...selectedLeagues, leagueId]);
    }
  };

  const handleLeagueSeasonChange = async (leagueSeasonId, wasChecked) => {
    if (wasChecked) {
      setSelectedLeagueSeasons(selectedLeagueSeasons.filter((id) => id !== leagueSeasonId));
    } else {
      setSelectedLeagueSeasons([...selectedLeagueSeasons, leagueSeasonId]);
    }
  };

  const handleTeamsChange = (teamId, wasChecked) => {
    if (wasChecked) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };
  

  const handleSelectAllLeaguesChange = (event) => {
    const checked = event.target.checked;
    setSelectAllLeagues(checked);
  
    if (checked) {
      const leagueIds = leagues.map(
        (league) => league.id
      );
      setSelectedLeagues(leagueIds);
    } else {
      setSelectedLeagues([]);
    }
  };

  const handleSelectAllLeagueSeasonsChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllLeagueSeasons(isChecked);
  
    if (isChecked) {
      const leagueSeasonIds = leagueSeasons.map(
        (leagueSeason) => leagueSeason.id
      );
      setSelectedLeagueSeasons(leagueSeasonIds);
    } else {
      setSelectedLeagueSeasons([]);
    }
  };

  const handleSelectAllTeamsChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllTeams(isChecked);
  
    if (isChecked) {
      const teamIds = teams.map(
        (team) => team.id
      );
      setSelectedTeams(teamIds);
    } else {
      setSelectedTeams([]);
    }
  };


  const handleRandomPlayerButtonClick = async () => {
    if (selectedTeams.length === 0) {
      setShowModal(true);
    } else {
        try {
          // const response = await axiosInstance.get('/api/player_in_team_seasons', {
          //     params: {
          //         leagueSeasonIds: selectedLeagueSeasons.join(','),
          //         teamIds: selectedTeams.join(','),
          //     },
          // });
          const response = await axiosInstance.get('/api/player', {
            params: {
              playerId: 1
            },
          });

          if (response.status === 200){
            setPlayer(response.data.player);
            setCareer(response.data.career);
            console.log(response.data.player);
            console.log(response.data.career);
          } else {
            console.error(`Response was not OK`)
          }
        } catch (error) {
            console.error(error);
        }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-5">TIMCHWAI</h1>
        </Col>
      </Row>
  
      <Row className="align-items-center">
        <Col>
          <Form.Group as={Form.Row} className="align-items-center">
            <Col>
              <Form.Check
                type="checkbox"
                label="Select All"
                checked={selectAllLeagues}
                onChange={handleSelectAllLeaguesChange}
              />
              <Button
                variant="outline-secondary"
                size="sm"
                className="ml-2"
                onClick={() => setShowLeagues(!showLeagues)}
              >
                {showLeagues ? 'Collapse' : 'Expand'}
              </Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Collapse in={showLeagues}>
        <div>
          <Row>
            {leagues.map((league, index) => (
              <LeagueCard key={index} league={league} onLeagueClick={handleLeagueChange} />
            ))}
          </Row>
        </div>
      </Collapse>
  
      <Row className="align-items-center">
        <Col>
          <Form.Group as={Form.Row} className="align-items-center">
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                label="Select All"
                checked={selectAllLeagueSeasons}
                onChange={handleSelectAllLeagueSeasonsChange}
              />
              <Button
                variant="outline-secondary"
                size="sm"
                className="ml-2"
                onClick={() => setShowLeagueSeasons(!showLeagueSeasons)}
              >
                {showLeagueSeasons ? 'Collapse' : 'Expand'}
              </Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Collapse in={showLeagueSeasons}>
        <div>
          <Row>
            {leagueSeasons.map((leagueSeason, index) => (
              <LeagueSeasonCard
                key={index}
                leagueSeason={leagueSeason}
                onLeagueSeasonClick={handleLeagueSeasonChange}
              />
            ))}
          </Row>
        </div>
      </Collapse>
  
      <Row>
        <Col>
          <Form.Group as={Form.Row} className="align-items-center">
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                label="Select All Teams"
                checked={selectAllTeams}
                onChange={handleSelectAllTeamsChange}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowTeams(!showTeams)}
              >
                {showTeams ? 'Collapse' : 'Expand'}
              </Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Collapse in={showTeams}>
        <div>
          <Row>
            {teams.map((team, index) => (
              <TeamCard key={index} team={team} onTeamClick={handleTeamsChange} />
            ))}
          </Row>
        </div>
      </Collapse>
      
      {selectedTeams.length > 0 && (
        <Row>
          <Col>
            <Button className='btn-block' variant="primary" onClick={handleRandomPlayerButtonClick}>
              Generate Random Player
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
