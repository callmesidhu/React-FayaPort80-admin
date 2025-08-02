import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Loader2, Save, ArrowLeft } from 'lucide-react';
import { Event, EventFormData } from '@/types/event';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: EventFormData) => Promise<boolean>;
  title: string;
  description: string;
}

export const EventForm: React.FC<EventFormProps> = ({ 
  initialData, 
  onSubmit, 
  title, 
  description 
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | undefined>(initialData?.posterUrl);
  
  const [formData, setFormData] = useState<EventFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    speakerName: initialData?.speakerName || '',
    speakerDescription: initialData?.speakerDescription || '',
    speakerPosition: initialData?.speakerPosition || '',
    company: initialData?.company || '',
    videoUrl: initialData?.videoUrl || '',
    bookingUrl: initialData?.bookingUrl || '',
  });

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, posterFile: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await onSubmit(formData);
      if (success) {
        navigate('/dashboard/events');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="transition-all duration-200 hover:shadow-soft"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Event Information */}
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
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
                    onChange={(e) => handleInputChange('date', e.target.value)}
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
                    onChange={(e) => handleInputChange('time', e.target.value)}
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
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>
            </CardContent>
          </Card>

          {/* Speaker Information */}
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
                  onChange={(e) => handleInputChange('speakerName', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakerPosition">Position *</Label>
                <Input
                  id="speakerPosition"
                  value={formData.speakerPosition}
                  onChange={(e) => handleInputChange('speakerPosition', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakerDescription">Speaker Bio *</Label>
                <Textarea
                  id="speakerDescription"
                  value={formData.speakerDescription}
                  onChange={(e) => handleInputChange('speakerDescription', e.target.value)}
                  required
                  rows={3}
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Media & Links */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Media & Links</CardTitle>
            <CardDescription>Upload poster and add relevant links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Event Poster</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 transition-all duration-200 hover:border-primary/50">
                {posterPreview ? (
                  <div className="space-y-4">
                    <div className="relative max-w-xs mx-auto">
                      <img 
                        src={posterPreview} 
                        alt="Poster preview" 
                        className="rounded-lg shadow-medium w-full h-auto"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary">
                        Preview
                      </Badge>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full transition-all duration-200 hover:shadow-soft"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change Poster
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Upload event poster</h4>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to browse
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="transition-all duration-200 hover:shadow-soft"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Poster
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
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
                  onChange={(e) => handleInputChange('bookingUrl', e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="transition-all duration-200 hover:shadow-soft"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="transition-all duration-200 hover:shadow-soft"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {initialData ? 'Update Event' : 'Create Event'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};