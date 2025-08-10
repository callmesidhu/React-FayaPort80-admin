import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { Event, EventFormData } from '@/types/event';
import { apiService } from '@/services/apiService';
import { EventInfoCard } from '@/components/EventInfoCard';
import { SpeakerInfoCard } from '@/components/SpeakerInfoCard';
import { MediaLinksCard } from '@/components/MediaLinksCard';

interface EventFormProps {
  initialData?: Event;
  onSubmit?: (data: EventFormData) => Promise<any>;
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
  const [loading, setLoading] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | undefined>(initialData?.posterUrl);
  const [uploadedPosterUrl, setUploadedPosterUrl] = useState<string | undefined>(initialData?.posterUrl);
  const [userDetails, setUserDetails] = useState<any>(null);
  
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

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await apiService.getUserDetails();
        setUserDetails(details);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        // Handle error - maybe redirect to login
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePosterChange = (previewUrl: string | undefined, uploadedUrl: string | undefined) => {
    setPosterPreview(previewUrl);
    setUploadedPosterUrl(uploadedUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails?.port_uuid) {
      alert('User details not loaded. Please refresh and try again.');
      return;
    }

    if (!uploadedPosterUrl) {
      alert('Please upload a poster before submitting.');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API - ensure all required fields are strings
      const eventData = {
        port_uuid: userDetails.port_uuid,
        event_name: formData.name.trim(),
        event_description: formData.description.trim(),
        event_location: formData.location.trim(),
        event_time: formData.time,
        event_date: formData.date,
        event_poster_url: uploadedPosterUrl,
        video_url: formData.videoUrl?.trim() || '',
        speaker_name: formData.speakerName.trim(),
        speaker_description: formData.speakerDescription.trim(),
        speaker_position: formData.speakerPosition.trim(),
        company: formData.company.trim(),
        booking_url: formData.bookingUrl.trim(),
      };

      // Validate required fields
      const requiredFields = [
        { key: 'event_name', value: eventData.event_name },
        { key: 'event_description', value: eventData.event_description },
        { key: 'event_location', value: eventData.event_location },
        { key: 'event_time', value: eventData.event_time },
        { key: 'event_date', value: eventData.event_date },
        { key: 'speaker_name', value: eventData.speaker_name },
        { key: 'speaker_description', value: eventData.speaker_description },
        { key: 'speaker_position', value: eventData.speaker_position },
        { key: 'company', value: eventData.company },
        { key: 'booking_url', value: eventData.booking_url },
      ];

      const missingFields = requiredFields.filter(field => !field.value);
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.map(f => f.key).join(', ')}`);
        return;
      }

      console.log('Final event data being sent:', eventData);

      const result = await apiService.submitEvent(eventData);
      console.log('Event submitted successfully:', result);
      
      // Call the provided onSubmit if it exists for additional processing
      if (onSubmit && typeof onSubmit === 'function') {
        await onSubmit(formData);
      }
      
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Failed to submit event:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to submit event: ${errorMessage}`);
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
          <EventInfoCard 
            formData={formData}
            onInputChange={handleInputChange}
          />
          
          <SpeakerInfoCard 
            formData={formData}
            onInputChange={handleInputChange}
          />
        </div>

        <MediaLinksCard
          formData={formData}
          onInputChange={handleInputChange}
          posterPreview={posterPreview}
          uploadedPosterUrl={uploadedPosterUrl}
          onPosterChange={handlePosterChange}
        />

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
            disabled={loading || !uploadedPosterUrl}
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