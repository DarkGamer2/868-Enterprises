// MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface MapComponentProps {
  mapLocation: MapLocation;
}

// Fix for default marker issue with react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent: React.FC<MapComponentProps> = ({ mapLocation }) => {
  const position: [number, number] = [mapLocation.latitude, mapLocation.longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {mapLocation.address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;