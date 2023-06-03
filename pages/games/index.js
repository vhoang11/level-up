import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);
  const displayGames = () => {
    getGames(user.uid).then((data) => setGames(data));
  };

  return (
    <article className="games" id="games">
      <h1 style={{ marginTop: '40px' }}>Games</h1>

      <Button
        onClick={() => {
          router.push('/games/new');
        }}
        style={{ margin: '40px', backgroundColor: 'orange', borderColor: 'orange' }}
      >
        Register New Game
      </Button>

      {games.map((game) => (
        <section
          key={`game--${game.id}`}
          className="game"
          style={{ margin: '40px' }}
          id="game-section"
        >
          <GameCard
            title={game.title}
            maker={game.maker}
            numberOfPlayers={game.number_of_players}
            skillLevel={game.skill_level}
            id={game.id}
            onUpdate={displayGames}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
