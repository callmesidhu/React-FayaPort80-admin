import { useState, useEffect } from 'react';
import { Event, EventFormData } from '@/types/event';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/events/show`);

        // Map backend fields to frontend Event type
        const mappedEvents: Event[] = res.data.map((e: any) => ({
          id: String(e.id),
          name: e.event_name,
          description: e.event_description,
          date: e.event_date,
          time: e.event_time,
          location: e.event_location,
          speakerName: e.speaker_name,
          speakerDescription: e.speaker_description,
          speakerPosition: e.speaker_position,
          company: e.company,
          videoUrl: e.video_url,
          bookingUrl: e.booking_url,
          posterUrl: e.event_poster_url,
          createdAt: new Date().toISOString(), // backend doesn't return, so use now
          updatedAt: new Date().toISOString(),
        }));

        setEvents(mappedEvents);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch events from server.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  return {
    events,
    loading,
  };
};
