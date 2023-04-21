// src/PlayerCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlayerCard = ({ player }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/player/${player.id}`);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 345, margin: 2 }}>
      <CardActionArea>
        {player.image && (
          <CardMedia
            component="img"
            image={player.image}
            alt={player.name}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {player.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Positions: {player.positions.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            <Link href={`https://en.wikipedia.org/wiki/${player.wiki_link}`} target="_blank" rel="noopener">
              Wikipedia
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          color="primary"
        >
          View Player
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
