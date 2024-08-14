import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axiosInstance from '../axiosInstance';

import PlayerCard from '../components/PlayerCard';
import CareerTable from '../components/CareerTable';

import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import GeneratePlayerBar from '../components/GeneratePlayerBar';
import PlayerSearchBar from '../components/PlayerSearchBar';

import PlayerContext from '../components/PlayerContext';


const RandomScreen = () => {
  const [player, setPlayer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [career, setCareer] = useState(null);
  const [showCareer, setShowCareer] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const players = useContext(PlayerContext);

  // Player

  const fetchPlayer = async () => {
    setPlayer({});
    setCareer({});
    setShowPlayer(false);
    setShowCareer(false);
    setShowSearchBar(false);
    setShowAnimation(true);

    try {
      const response = await axiosInstance.get('/random_player');
      if (response.status === 200) {
        setPlayer(response.data);
        setCareer(response.data.Careers);
        console.log(`Player is: ${response.data.name}`);
        setShowAnimation(false);
        setShowCareer(true);
        setShowPlayer(false);
        setShowSearchBar(true);
      } else {
        console.error(`Response was not OK`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  const onShowPlayer = async (val) => {
    setShowPlayer(val);
  }

  const handleRandomPlayerButtonClick = async () => {
    fetchPlayer();
  };

  return (
    <div>
      <CssBaseline />
      <Navbar players={players}/>
      <Container maxWidth="lg">
        
        <GeneratePlayerBar handleRandomPlayerButtonClick={handleRandomPlayerButtonClick} handleFilterButtonClick={() => {}} showFilters={() => {}} randomScreen={true} />
        
        <Box sx={{ flexGrow: 1, p: 1 }}>

          {showAnimation && (
              <LoadingAnimation />
          )}
            
          <Container className='player'>                
            {player && showPlayer && (
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                  <PlayerCard player={player} />
                </Box>
            )}
          </Container>

          {player && players && showSearchBar && (
            <PlayerSearchBar player={player} players={players} handleShowPlayer={onShowPlayer} modalVisible={modalVisible} setModalVisible={setModalVisible} />
          )}

          {career && showCareer && (
            <CareerTable careers={career} />
          )}
          
        </Box>
      </Container>
    </div>
  )
}

export default RandomScreen;
