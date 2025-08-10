import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EventFormData } from '@/types/event';

interface EventInfoCardProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
}

export const EventInfoCard: React.FC<EventInfoCardProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Event Information</CardTitle>
        <CardDescription>Basic details about the event</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Event Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            required
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            required
            rows={3}
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Event Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => onInputChange('date', e.target.value)}
              required
              className="transition-all duration-200 focus:shadow-soft"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Event Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => onInputChange('time', e.target.value)}
              required
              className="transition-all duration-200 focus:shadow-soft"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            required
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>
      </CardContent>
    </Card>
  );
};