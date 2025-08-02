import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, TrendingUp } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';

export const Dashboard: React.FC = () => {
  const { events, loading } = useEvents();

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const totalEvents = events.length;
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });

  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      description: 'All events in system',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents.length,
      description: 'Events scheduled ahead',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'This Month',
      value: thisMonthEvents.length,
      description: 'Events this month',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Locations',
      value: new Set(events.map(e => e.location)).size,
      description: 'Unique venues',
      icon: MapPin,
      color: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your events and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="shadow-card hover:shadow-medium transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest events in your system</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events found. Create your first event to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.slice(0, 5).map((event, index) => (
                <div 
                  key={event.id} 
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.speakerName}</p>
                    <p className="text-xs text-muted-foreground">{event.company}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};