// src/TeamCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const TeamCard = ({ team, onTeamClick, isSelected }) => {
  const handleCardClick = () => {
    onTeamClick(team.id, isSelected);
  };

  return (
    <Card
      sx={{
        width: '100%',
        paddingBottom: '75%', // Maintain aspect ratio 4:3
        position: 'relative',
        bgcolor: isSelected ? 'grey.300' : 'background.paper',
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: 'contain',
            width: '90%',
            height: '90%',
          }}
          alt={team.name}
          image={team.image}
        />
      </CardActionArea>
    </Card>
  );
};

export default TeamCard;
