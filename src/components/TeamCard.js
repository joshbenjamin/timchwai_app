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
        paddingBottom: '75%',
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
          image={`${team.image}?t_cache=public,max-age=31536000`}
        />
      </CardActionArea>
    </Card>
  );
};

export default TeamCard;
