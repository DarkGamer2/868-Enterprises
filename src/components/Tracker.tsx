// Tracker.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from "../components/Tracker/ProgressBar"
import TrackingTimeline from '../components/Tracker/TrackingTimeline';
import MapComponent from '../components/Tracker/MapComponent';

const Tracker: React.FC = () => {
  const [orderTracking, setOrderTracking] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrackingData() {
      try {
        const response = await axios.get('/api/tracking/113-2351'); // Replace with your API endpoint
        setOrderTracking(response.data);
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrackingData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderTracking) {
    return <div>Error loading tracking data.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order #{orderTracking.orderId}</h1>
      <h3 className="text-lg mb-2">Arriving {orderTracking.arrivalDate}</h3>

      <ProgressBar currentStatus={orderTracking.currentStatus} />

      <div className="flex">
        <div className="w-1/2">
          <TrackingTimeline trackingEvents={orderTracking.trackingEvents} />
        </div>
        <div className="w-1/2">
          {orderTracking.mapLocation && (
            <MapComponent mapLocation={orderTracking.mapLocation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracker;