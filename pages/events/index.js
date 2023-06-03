import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user]);
  const displayEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  return (
    <article className="events">
      <h1 style={{ marginTop: '40px' }}>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
        style={{ margin: '40px', backgroundColor: 'orange', borderColor: 'orange' }}
      >
        Create Event
      </Button>
      {events.map((event) => (
        <section
          key={`event--${event.id}`}
          className="event"
          style={{ margin: '40px' }}
        >
          <EventCard id={event.id} game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer} onUpdate={displayEvents} joined={event.joined} />
        </section>
      ))}
    </article>

  );
}

export default Home;
