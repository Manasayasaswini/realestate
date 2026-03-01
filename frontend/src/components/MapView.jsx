import { MapContainer, Polygon, TileLayer } from 'react-leaflet';

const polygonCenter = (coordinates = []) => {
  if (!coordinates.length) return [12.9716, 77.5946];

  const totals = coordinates.reduce(
    (acc, [lat, lng]) => ({ lat: acc.lat + lat, lng: acc.lng + lng }),
    { lat: 0, lng: 0 }
  );

  return [totals.lat / coordinates.length, totals.lng / coordinates.length];
};

const MapView = ({ coordinates, color = '#1f6feb', onPolygonClick }) => {
  const center = polygonCenter(coordinates);

  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ width: '100%', height: '320px', borderRadius: '12px', overflow: 'hidden' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon
        positions={coordinates}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.35 }}
        eventHandlers={{
          click: () => onPolygonClick?.()
        }}
      />
    </MapContainer>
  );
};

export default MapView;
