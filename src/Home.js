// src/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axiosInstance from './axiosInstance';

import { PlayerInfo } from '../src/components/PlayerInfo';

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueSeasons, setLeagueSeasons] = useState([]);
  const [selectedLeagueSeasons, setSelectedLeagueSeasons] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectAllTeams, setSelectAllTeams] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [player, setPlayer] = useState({});
  const [career, setCareer] = useState([]);



  // Fetch leagues on component mount
  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
        const response = await axiosInstance.get('/api/leagues/');
        setLeagues(response.data);
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
  };

  const handleLeagueChange = async (event) => {
    const leagueId = event.target.value;
    setSelectedLeague(leagueId);
  
    // Fetch league seasons for the selected league
    try {
      const response = await axiosInstance.get('/api/league_seasons', {
        params: {
            leagueId: leagueId
        }
      });
      const leagueSeasonsData = response.data;
      setLeagueSeasons(leagueSeasonsData);
    } catch (error) {
      console.error('Error fetching league seasons:', error);
      // Handle error (e.g., show a message or set an error state)
    }
  };

  const handleLeagueSeasonChange = (event) => {
    const leagueSeasonId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedLeagueSeasons([...selectedLeagueSeasons, leagueSeasonId]);
    } else {
      setSelectedLeagueSeasons(selectedLeagueSeasons.filter((id) => id !== leagueSeasonId));
    }
  };

  const fetchTeams = useCallback(async () => {
    console.log(`Selected league seasons: \n ${selectedLeagueSeasons}`)
        try {
            const response = await axiosInstance.get('/api/teams_in_seasons', {
                params: {
                leagueSeasonIds: selectedLeagueSeasons.join(','),
                },
            });
            const teamsData = response.data;
            const teamNamesAndIds = teamsData.map((team) => ({ name: team.name, id: team.id, image: team.image }));
            setTeams(teamNamesAndIds);
            } catch (error) {
            console.error('Error fetching team seasons:', error);
            }
  }, [selectedLeagueSeasons]);
  
  useEffect(() => {
    if (selectedLeagueSeasons && selectedLeagueSeasons.length > 0) {
      fetchTeams();
    }
  }, [fetchTeams, selectedLeagueSeasons]);

  const handleTeamCheckboxChange = (event) => {
    console.log("Clicked here");
    const teamId = parseInt(event.target.value);
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, teamId]);
    } else {
      setSelectedTeams((prevSelectedTeams) =>
        prevSelectedTeams.filter((id) => id !== teamId)
      );
    }
  };

  const handleSelectAllTeamsChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllTeams(isChecked);
  
    if (isChecked) {
      const teamIds = teams.map((team) => team.id);
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
            const response = await axiosInstance.get('/api/player_in_team_seasons', {
                params: {
                    leagueSeasonIds: selectedLeagueSeasons.join(','),
                    teamIds: selectedTeams.join(','),
                },
            });

            if (response.status === 200){
              setPlayer(response.data.player);
              setCareer(response.data.career);
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
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Leagues</Form.Label>
              <Form.Control as="select" onChange={handleLeagueChange}>
                <option value="">Select a league</option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>League Seasons</Form.Label>
              <div>
                {leagueSeasons.map((leagueSeason) => (
                  <Form.Check
                    key={leagueSeason.id}
                    inline
                    label={`${leagueSeason.from_year} - ${leagueSeason.to_year}`}
                    type="checkbox"
                    value={leagueSeason.id}
                    onChange={handleLeagueSeasonChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group>
                <Form.Label>Teams</Form.Label>
                <div>
                    <Form.Check
                    type="checkbox"
                    label="Select All"
                    checked={selectAllTeams}
                    onChange={handleSelectAllTeamsChange}
                    />
                    {teams.map((team, index) => (
                    <Form.Check key={index} className="team-checkbox">
                        <Form.Check.Input
                        type="checkbox"
                        value={team.id}
                        checked={selectedTeams.includes(team.id)}
                        onChange={handleTeamCheckboxChange}
                        />
                        <Form.Check.Label>
                        <img src={team.image} alt={`${team.name} logo`} className="team-logo" width='30px' height='30px' />
                        {team.name}
                        </Form.Check.Label>
                    </Form.Check>
                    ))}
                </div>
            </Form.Group>
            <Button variant="primary" onClick={handleRandomPlayerButtonClick}>
                Generate Random Player
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please select at least one team before clicking the "Generate Random Player" button.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayerInfo player={player} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
