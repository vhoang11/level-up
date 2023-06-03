/* eslint-disable no-param-reassign */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/forms/GameForm';

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleGame(id).then((obj) => {
      obj.numberOfPlayers = obj.number_of_players;
      obj.skillLevel = obj.skill_level;
      obj.gameType = obj.game_type;
      setEditItem(obj);
    });
  }, [id]);
  // useEffect(() => {
  //   getSingleGame(id).then(setEditItem);
  // }, [id]);
  return (
    <>
      <Head>
        <title>Edit Game</title>
      </Head>
      <div>
        <GameForm obj={editItem} />
      </div>

    </>
  );
}
