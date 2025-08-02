export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakerName: string;
  speakerDescription: string;
  speakerPosition: string;
  company: string;
  posterUrl?: string;
  videoUrl?: string;
  bookingUrl: string;
  createdAt: string;
  updatedAt: string;
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
  posterFile?: File;
  videoUrl?: string;
  bookingUrl: string;
}