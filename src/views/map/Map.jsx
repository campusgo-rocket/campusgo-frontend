import { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function MapaCali() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleOriginChange = (e) => {
    const value = e.target.value.trim();
    if (value) {
      const [lat, lng] = value.split(',').map(parseFloat);
      setOrigin([lat, lng]);
    } else {
      setOrigin(null);
    }
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value.trim();
    if (value) {
      const [lat, lng] = value.split(',').map(parseFloat);
      setDestination([lat, lng]);
    } else {
      setDestination(null);
    }
  };

  const setOriginToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location: ', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getRoute = async () => {
    if (origin && destination) {
      try {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
        );
        const coordinates = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoordinates(coordinates);
      } catch (error) {
        console.error('Error fetching route: ', error);
      }
    }
  };

  return (
    
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h2>Ingrese su ruta</h2>
        <div>
          <label>Origen (lat, lng):</label>
          <input type="text" onChange={handleOriginChange} />
          <button onClick={setOriginToCurrentLocation}>Usar mi ubicación actual</button>
        </div>
        <div>
          <label>Destino (lat, lng):</label>
          <input type="text" onChange={handleDestinationChange} />
        </div>
        <button onClick={getRoute} style={{ marginTop: '10px' }}>Obtener ruta</button>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Visualización del mapa</h2>
        <MapContainer center={[3.4516, -76.5320]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {origin && (
            <Marker position={origin}>
              <Popup>
                Origen
              </Popup>
            </Marker>
          )}

          {destination && (
            <Marker position={destination}>
              <Popup>
                Destino
              </Popup>
            </Marker>
          )}

          {routeCoordinates.length > 0 && (
            <Polyline positions={routeCoordinates} color="red" weight={4}>
              <Popup>
                Ruta desde el origen hasta el destino
              </Popup>
            </Polyline>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapaCali;
