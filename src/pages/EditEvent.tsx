import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { EventForm } from '@/components/events/EventForm';
import { useEvents } from '@/hooks/useEvents';

export const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEvent, updateEvent } = useEvents();
  
  const event = id ? getEvent(id) : undefined;

  if (!event) {
    return <Navigate to="/dashboard/events" replace />;
  }

  const handleSubmit = async (formData: any) => {
    return await updateEvent(event.id, formData);
  };

  return (
    <EventForm
      initialData={event}
      onSubmit={handleSubmit}
      title="Edit Event"
      description="Update event details and information"
    />
  );
};