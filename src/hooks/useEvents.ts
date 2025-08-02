import { useState, useEffect } from 'react';
import { Event, EventFormData } from '@/types/event';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Innovation Summit 2024',
    description: 'Explore the latest trends in technology and innovation',
    date: '2024-03-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    speakerName: 'Dr. Sarah Johnson',
    speakerDescription: 'Leading expert in AI and machine learning with over 15 years of experience',
    speakerPosition: 'Chief Technology Officer',
    company: 'TechCorp Inc.',
    videoUrl: 'https://youtube.com/watch?v=example',
    bookingUrl: 'https://eventbrite.com/example',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Digital Marketing Masterclass',
    description: 'Master the art of digital marketing in the modern age',
    date: '2024-03-22',
    time: '14:00',
    location: 'New York Business Center',
    speakerName: 'Mike Chen',
    speakerDescription: 'Digital marketing strategist who has helped 100+ companies grow their online presence',
    speakerPosition: 'Marketing Director',
    company: 'Growth Agency',
    videoUrl: 'https://youtube.com/watch?v=example2',
    bookingUrl: 'https://eventbrite.com/example2',
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
  },
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents(mockEvents);
        localStorage.setItem('events', JSON.stringify(mockEvents));
      }
      setLoading(false);
    }, 500);
  }, []);

  const createEvent = async (eventData: EventFormData): Promise<boolean> => {
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        posterUrl: eventData.posterFile ? URL.createObjectURL(eventData.posterFile) : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));

      toast({
        title: "Success!",
        description: "Event created successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateEvent = async (id: string, eventData: EventFormData): Promise<boolean> => {
    try {
      const updatedEvents = events.map(event => 
        event.id === id 
          ? {
              ...event,
              ...eventData,
              posterUrl: eventData.posterFile ? URL.createObjectURL(eventData.posterFile) : event.posterUrl,
              updatedAt: new Date().toISOString(),
            }
          : event
      );

      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));

      toast({
        title: "Success!",
        description: "Event updated successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));

      toast({
        title: "Success!",
        description: "Event deleted successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getEvent = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  };
};