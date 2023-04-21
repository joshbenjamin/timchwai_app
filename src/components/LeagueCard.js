// src/LeagueCard.js
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';

const LeagueCard = ({ league, onLeagueClick, isSelected }) => {
  const handleCardClick = () => {
    onLeagueClick(league.id);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 345,
        margin: 2,
        bgcolor: isSelected ? 'grey.300' : 'background.paper',
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {league.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <CardMedia component="img" image={league.image} alt={league.name} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LeagueCard;
