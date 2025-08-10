import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Loader2 } from 'lucide-react';
import { apiService } from '@/services/apiService';

interface PosterUploadProps {
  posterPreview?: string;
  uploadedPosterUrl?: string;
  onPosterChange: (previewUrl: string | undefined, uploadedUrl: string | undefined) => void;
  required?: boolean;
}

export const PosterUpload: React.FC<PosterUploadProps> = ({
  posterPreview,
  uploadedPosterUrl,
  onPosterChange,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        onPosterChange(previewUrl, undefined);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadingPoster(true);
    try {
      const uploadResponse = await apiService.uploadPoster(selectedFile);
      onPosterChange(posterPreview, uploadResponse.image_url);
      console.log('Poster uploaded successfully:', uploadResponse);
    } catch (error) {
      console.error('Failed to upload poster:', error);
      // Reset preview on error
      onPosterChange(undefined, undefined);
      setSelectedFile(null);
      alert('Failed to upload poster. Please try again.');
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>Event Poster {required && '*'}</Label>
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
                {uploadingPoster ? 'Uploading...' : uploadedPosterUrl ? 'Uploaded' : 'Preview'}
              </Badge>
              {uploadingPoster && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSelectFile}
                disabled={uploadingPoster}
                className="flex-1 transition-all duration-200 hover:shadow-soft"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Poster
              </Button>
              {!uploadedPosterUrl && selectedFile && (
                <Button 
                  type="button" 
                  onClick={handleUpload}
                  disabled={uploadingPoster}
                  className="transition-all duration-200 hover:shadow-soft"
                >
                  {uploadingPoster ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Image className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h4 className="font-medium">Upload event poster {required && '*'}</h4>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSelectFile}
              disabled={uploadingPoster}
              className="transition-all duration-200 hover:shadow-soft"
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Poster
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
  );
};