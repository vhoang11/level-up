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

// GameForm component
const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]); // State for storing game types
  const [currentGame, setCurrentGame] = useState(initialState); // State for storing current game data
  const router = useRouter(); // Router instance from Next.js
  const { user } = useAuth(); // Accessing authentication context

  useEffect(() => {
    // When the component mounts or the "obj" or "user" changes, update the current game state
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.numberOfPlayers,
        skillLevel: obj.skillLevel,
        gameType: obj.gameType.id,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    // When the component mounts, fetch the game types and update the game types state
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate if the input is a valid integer
    if (name === 'numberOfPlayers' && !Number.isInteger(Number(value))) {
      return; // Do not update the state if the input is not a valid integer
    }

    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent the form from being submitted
    e.preventDefault();

    // Check if the game has an ID (existing game being updated)
    if (obj.id) {
      // Prepare game data for update
      const gameUpdate = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: currentGame.numberOfPlayers,
        skillLevel: currentGame.skillLevel,
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      // Update the game data using the updateGame function
      updateGame(gameUpdate)
        .then(() => router.push('/games/games')); // Redirect to the games page after the update
    } else {
      // Prepare game data for creation
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: currentGame.numberOfPlayers,
        skillLevel: currentGame.skillLevel,
        gameType: currentGame.gameType,
        userId: user.uid,
      };
      // Create a new game by sending a POST request to the server using the createGame function
      createGame(game).then(() => router.push('/games/games')); // Redirect to the games page after the creation
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Game</h2>

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
      // Map over the gameTypes array and render an option element for each game type
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
    gameType: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
