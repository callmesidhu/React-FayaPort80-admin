import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  User, 
  Edit, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { DeleteEventDialog } from '@/components/events/DeleteEventDialog';

export const EventsList: React.FC = () => {
  const { events, loading } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(true);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.speakerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isPastEvent = new Date(event.date) < new Date();
    
    if (!showPastEvents && isPastEvent) {
      return false;
    }
    
    return matchesSearch;
  });

  const isEventUpcoming = (date: string) => {
    return new Date(date) >= new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage all your events</p>
        </div>
        <Button asChild className="shadow-card hover:shadow-medium transition-all duration-200">
          <Link to="/dashboard/events/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, speakers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-past"
                checked={showPastEvents}
                onCheckedChange={setShowPastEvents}
              />
              <Label htmlFor="show-past">Show past events</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first event to get started.'}
              </p>
              <Button asChild>
                <Link to="/dashboard/events/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Speaker</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event, index) => (
                  <TableRow 
                    key={event.id} 
                    className="animate-fade-in hover:bg-muted/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {event.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.time}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{event.speakerName}</div>
                          <div className="text-xs text-muted-foreground">{event.company}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={isEventUpcoming(event.date) ? "default" : "secondary"}
                        className="transition-all duration-200"
                      >
                        {isEventUpcoming(event.date) ? "Upcoming" : "Past"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {event.bookingUrl && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="transition-all duration-200 hover:shadow-soft"
                          >
                            <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="transition-all duration-200 hover:shadow-soft"
                        >
                          <Link to={`/dashboard/events/${event.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDeleteEventId(event.id)}
                          className="transition-all duration-200 hover:shadow-soft hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <DeleteEventDialog 
        eventId={deleteEventId}
        onClose={() => setDeleteEventId(null)}
      />
    </div>
  );
};