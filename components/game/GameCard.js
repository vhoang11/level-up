import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const router = useRouter();

  const deletethisGame = () => {
    if (window.confirm('Delete your game?')) {
      deleteGame(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center" style={{ width: '300px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Button
        onClick={() => {
          router.push(`/games/edit/${id}`);
        }}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        Edit Game
      </Button>
      <Button
        onClick={deletethisGame}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        Delete
      </Button>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
