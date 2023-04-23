// src/LeagueSeasonCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LeagueSeasonCard = ({ leagueSeason, onLeagueSeasonClick, isSelected }) => {
  const handleCardClick = () => {
    onLeagueSeasonClick(leagueSeason.id);
  };

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        bgcolor: isSelected ? 'grey.300' : 'background.paper',
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {leagueSeason.League.name}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {leagueSeason.from_year} - {leagueSeason.to_year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LeagueSeasonCard;
