// src/LeagueCard.js
import React from 'react';
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
        width: '100%',
        position: 'relative',
        bgcolor: isSelected ? 'grey.300' : 'background.paper',
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {league.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <CardMedia component="img" image={`${league.image}?t_cache=public,max-age=31536000`} alt={league.name} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LeagueCard;
