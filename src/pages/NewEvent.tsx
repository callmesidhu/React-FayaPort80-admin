import React from 'react';
import { EventForm } from '@/components/events/EventForm';
import { useEvents } from '@/hooks/useEvents';

export const NewEvent: React.FC = () => {
  const { createEvent } = useEvents();

  return (
    <EventForm
      onSubmit={createEvent}
      title="Add New Event"
      description="Create a new event with all the necessary details"
    />
  );
};