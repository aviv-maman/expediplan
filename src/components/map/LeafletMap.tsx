'use client';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  latitude?: number;
  longitude?: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude = 0, longitude = 0 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the map instance
    const map = L.map(mapRef.current || '').setView([latitude, longitude], 8);

    // Add the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    return () => {
      // Clean up the map when the component is unmounted
      map.remove();
    };
  }, []);

  return <div id={`map-${latitude}-${longitude}`} ref={mapRef} style={{ height: '400px' }} />;
};

export default LeafletMap;
