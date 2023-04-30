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

import IconButton from '@mui/material/IconButton';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const PlayerCard = ({ player, playerScreen = false }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/player/${player.id}`);
  };

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/player/${player.id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 345, margin: 2 }}>
      <CardActionArea>
        {player.image && (
          <CardMedia
            component="img"
            image={`${player.image}?t_cache=public,max-age=31536000`}
            alt={player.name}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {player.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date of Birth: {new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(player.birth_date))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {player.positions.length > 1 ? 
              `Position(s): ${player.positions.join(', ')}` : 
              `Position: ${player.positions[0]}`
            }
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            <Link href={`https://en.wikipedia.org/wiki/${player.wiki_link}`} target="_blank" rel="noopener">
              Wikipedia
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        {!playerScreen && (
          <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
          >
            View Player Page
          </Button>
        )}
        <IconButton
          onClick={copyToClipboard}
          edge="end"
          color="inherit"
          aria-label="copy"
        >
          <FileCopyOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
