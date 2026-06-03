import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function priceIcon(price) {
  const label = (price / 1000000).toFixed(1) + 'M';
  return L.divIcon({
    html: `<div style="background:#0A192F;color:#FFB800;padding:4px 8px;border-radius:16px;font-size:0.75rem;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);">${label}</div>`,
    className: '',
    iconAnchor: [30, 14],
  });
}

export default function PropertiesMap({ properties, onSelect }) {
  return (
    <MapContainer
      center={[43.237, 76.935]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={priceIcon(p.price)}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 6, marginBottom: 6 }} />
              <strong style={{ color: '#0A192F', display: 'block' }}>{p.title}</strong>
              <span style={{ color: '#FFB800', fontWeight: 700 }}>{(p.price / 1000000).toFixed(1)} млн ₸</span><br />
              <small>📐 {p.area} м² · {p.rooms === 0 ? 'Студия' : p.rooms + '-комн.'}</small><br />
              <small>📍 {p.address}</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
