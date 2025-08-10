import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EventFormData } from '@/types/event';

interface SpeakerInfoCardProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
}

export const SpeakerInfoCard: React.FC<SpeakerInfoCardProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Speaker Information</CardTitle>
        <CardDescription>Details about the event speaker</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="speakerName">Speaker Name *</Label>
          <Input
            id="speakerName"
            value={formData.speakerName}
            onChange={(e) => onInputChange('speakerName', e.target.value)}
            required
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speakerPosition">Position *</Label>
          <Input
            id="speakerPosition"
            value={formData.speakerPosition}
            onChange={(e) => onInputChange('speakerPosition', e.target.value)}
            required
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => onInputChange('company', e.target.value)}
            required
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speakerDescription">Speaker Bio *</Label>
          <Textarea
            id="speakerDescription"
            value={formData.speakerDescription}
            onChange={(e) => onInputChange('speakerDescription', e.target.value)}
            required
            rows={3}
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>
      </CardContent>
    </Card>
  );
};