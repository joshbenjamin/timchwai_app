import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Link, Button, CardActions, IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';

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

  const metersToFeetAndInches = (meters) => {
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet} ft ${inches} in`;
  };

  const generateTeamNames = () => {
    return player.Careers.map((career) => {
      let teamName = career.Team.name;
      if (career.loan) {
        teamName += ' (loan)';
      }
      return teamName;
    }).join(', ');
  };

  return (
    <Card sx={{ minWidth: 290, maxWidth: 380, margin: 2 }}>
      <CardActionArea>
        {player.image && (
          <CardMedia
            component="img"
            image={`${player.image}?t_cache=public,max-age=31536000`}
            alt={player.name}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" textAlign={'center'}>
            {player.name}
          </Typography>
          <Table>
            <TableBody>
              {player.full_name !== null && (
                <TableRow>
                  <TableCell variant="head">Full Name</TableCell>
                  <TableCell>{player.full_name}</TableCell>
                </TableRow>
              )}
              {player.birth_place !== null && (
                <TableRow>
                  <TableCell variant="head">Origin</TableCell>
                  <TableCell>{player.birth_place}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell variant="head">Birthday</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(player.birth_date))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">{player.positions.length > 1 ? 'Positions' : 'Position'}</TableCell>
                <TableCell>
                  {player.positions.join(', ')}
                </TableCell>
              </TableRow>
              {(player.height !== null || player.height !== 0) && (
                <TableRow>
                  <TableCell variant="head">Height</TableCell>
                  <TableCell>
                    {player.height + `m (${metersToFeetAndInches(player.height)})`}
                  </TableCell>
                </TableRow>
              )}
              {player.Careers.length !== 0 && (
                <TableRow>
                  <TableCell variant="head">Current Team{player.Careers.length > 1 ? 's' : ''}</TableCell>
                  <TableCell>{generateTeamNames()}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell variant="head">Wikipedia</TableCell>
                <TableCell>
                  <Link href={`https://en.wikipedia.org/wiki/${player.wiki_link}`} target="_blank" rel="noopener">
                    {player.name}
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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