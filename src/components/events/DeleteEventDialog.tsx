import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEvents } from '@/hooks/useEvents';
import { Trash2 } from 'lucide-react';

interface DeleteEventDialogProps {
  eventId: string | null;
  onClose: () => void;
}

export const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({ eventId, onClose }) => {
  const { events, deleteEvent } = useEvents();
  
  const event = eventId ? events.find(e => e.id === eventId) : null;

  const handleDelete = async () => {
    if (eventId) {
      await deleteEvent(eventId);
      onClose();
    }
  };

  return (
    <AlertDialog open={!!eventId} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="animate-scale-in">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <span>Delete Event</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{event?.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Event
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};