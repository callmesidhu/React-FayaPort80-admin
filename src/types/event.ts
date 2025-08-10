export interface Event {
  id?: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakerName: string;
  speakerDescription: string;
  speakerPosition: string;
  company: string;
  videoUrl?: string;
  bookingUrl: string;
  posterUrl?: string;
}

export interface EventFormData {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakerName: string;
  speakerDescription: string;
  speakerPosition: string;
  company: string;
  videoUrl?: string;
  bookingUrl: string;
}