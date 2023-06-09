/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  description,
  date,
  time,
  onUpdate,
  joined,
  game,
}) => {
  const { user } = useAuth();

  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  const join = () => joinEvent(id, user.uid).then(() => onUpdate());
  const deleteThisEvent = () => {
    if (window.confirm('Delete Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  return (
    <Card className="text-center" style={{ width: '300px' }}>
      <Card.Header>Game: {game}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        Edit Event
      </Button>
      <Button
        onClick={deleteThisEvent}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        Delete
      </Button>
      {
        joined
          ? (
            <Button
              className="btn-danger"
              onClick={leave}
              style={{ margin: '10px', backgroundColor: '#006400' }}
            >Leave
            </Button>
          )
          : (
            <Button
              className="btn-success"
              onClick={join}
              style={{ margin: '10px', backgroundColor: '#006400' }}
            >Join
            </Button>
          )
      }
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
  game: PropTypes.string.isRequired,
};

export default EventCard;
