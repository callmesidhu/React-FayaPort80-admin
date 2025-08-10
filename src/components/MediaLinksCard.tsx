import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventFormData } from '@/types/event';
import { PosterUpload } from './PosterUpload';

interface MediaLinksCardProps {
  formData: EventFormData;
  onInputChange: (field: keyof EventFormData, value: string) => void;
  posterPreview?: string;
  uploadedPosterUrl?: string;
  onPosterChange: (previewUrl: string | undefined, uploadedUrl: string | undefined) => void;
}

export const MediaLinksCard: React.FC<MediaLinksCardProps> = ({
  formData,
  onInputChange,
  posterPreview,
  uploadedPosterUrl,
  onPosterChange,
}) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Media & Links</CardTitle>
        <CardDescription>Upload poster and add relevant links</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PosterUpload
          posterPreview={posterPreview}
          uploadedPosterUrl={uploadedPosterUrl}
          onPosterChange={onPosterChange}
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={(e) => onInputChange('videoUrl', e.target.value)}
              className="transition-all duration-200 focus:shadow-soft"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingUrl">Booking URL *</Label>
            <Input
              id="bookingUrl"
              type="url"
              placeholder="https://eventbrite.com/..."
              value={formData.bookingUrl}
              onChange={(e) => onInputChange('bookingUrl', e.target.value)}
              required
              className="transition-all duration-200 focus:shadow-soft"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};