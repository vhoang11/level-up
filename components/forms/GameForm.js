import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createGame, getGameTypes, updateGame,
} from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: Number(obj.numberOfPlayers),
        skillLevel: Number(obj.skillLevel),
        gameType: Number(obj.gameType.id),
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the game has an ID (existing game being updated)
    if (obj.id) {
      // Prepare game data for update
      const gameUpdate = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      // Update the game data using the updateGame function
      updateGame(gameUpdate)
        .then(() => router.push('/games'));
    } else {
      // Prepare game data for creation
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      // Create a new game by sending a POST request to the server using the createGame function
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <h2 className="text-grey mt-5">{obj.id ? 'Update' : 'Create'} Game</h2>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select aria-label="gametype" name="gameType" onChange={handleChange} required value={currentGame.gameType}>
            <option value="">Pick a Type</option>
            {

      gameTypes.map((type) => (
        <option
          key={type.id} // Assign a unique key to each option element
          value={type.id} // Set the value of the option to the game type's ID
        >
          {type.label} {/* Display the label of the game type as the option text */}
        </option>
      ))
    }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    gameType: PropTypes.object,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
