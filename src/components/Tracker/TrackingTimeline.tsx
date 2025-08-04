// TrackingTimeline.tsx
import React from 'react';

 interface TrackingEvent {
  status: string; // e.g., "Ordered", "Shipped", "Out for delivery", "Delivered"
  date: string;  // Date of the event
  location?: string; // Optional location (if available)
}

interface OrderTracking {
  orderId: string;
  arrivalDate: string;
  currentStatus: string; // Current overall status
  trackingEvents: TrackingEvent[];
  mapLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface TrackingTimelineProps {
  trackingEvents: TrackingEvent[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ trackingEvents }) => {
  if (!trackingEvents || !Array.isArray(trackingEvents) || trackingEvents.length === 0) {
    return (
      <div className="text-gray-600 italic">
        Unable to fetch tracking details at this time.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trackingEvents.map((event, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div>
            <p className="font-semibold">{event.status}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            {event.location && <p className="text-sm text-gray-500">{event.location}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
export default TrackingTimeline;