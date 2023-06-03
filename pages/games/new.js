import GameForm from '../../components/forms/GameForm';
import { useAuth } from '../../utils/context/authContext';

const NewGame = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 style={{ marginTop: '40px' }}>Register New Game</h2>
      <GameForm user={user} />
    </div>
  );
};

export default NewGame;
