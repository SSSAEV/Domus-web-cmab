import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = L.divIcon({
  html: `<div style="background:#0A192F;color:#FFB800;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 2px 8px rgba(0,0,0,0.3);">🏛</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const offices = [
  {
    id: 1,
    name: 'Domus — Центральный офис',
    address: 'ул. Абая, 52, Алматы',
    hours: 'Пн–Пт: 9:00–19:00, Сб: 10:00–16:00',
    lat: 43.2565,
    lng: 76.9286,
  },
  {
    id: 2,
    name: 'Domus — Бостандык',
    address: 'пр. Достык, 128, Алматы',
    hours: 'Пн–Пт: 9:00–18:00, Сб: 10:00–14:00',
    lat: 43.2150,
    lng: 76.9560,
  },
  {
    id: 3,
    name: 'Domus — Алмалы',
    address: 'ул. Фурманова, 95, Алматы',
    hours: 'Пн–Пт: 9:00–18:00',
    lat: 43.2450,
    lng: 76.9100,
  },
];

export default function OfficesMap() {
  return (
    <MapContainer
      center={[43.237, 76.935]}
      zoom={12}
      style={{ height: '100%', width: '100%', minHeight: 350 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offices.map(o => (
        <Marker key={o.id} position={[o.lat, o.lng]} icon={customIcon}>
          <Popup>
            <strong style={{ color: '#0A192F' }}>{o.name}</strong><br />
            📍 {o.address}<br />
            🕐 {o.hours}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
