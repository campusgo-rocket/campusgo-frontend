import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const LocationPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);
    const [map, setMap] = useState(null);
    const prevOnLocationSelect = useRef(onLocationSelect); // Referencia para almacenar la última función onLocationSelect

    // Evento para capturar click en el mapa
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                onLocationSelect({ lat, lng });
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    // Configurar el control de búsqueda
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: true,
            showPopup: false,
            marker: {
                draggable: false,
            },
        });

        if (map) {
            map.addControl(searchControl);
        }

        return () => {
            if (map) {
                map.removeControl(searchControl);
            }
        };
    }, [map]);

    // Actualizar la función onLocationSelect si cambia
    useEffect(() => {
        prevOnLocationSelect.current = onLocationSelect;
    }, [onLocationSelect]);

    // Obtener ubicación actual solo una vez al montar
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setPosition([latitude, longitude]);
                if (prevOnLocationSelect.current) {
                    prevOnLocationSelect.current({ lat: latitude, lng: longitude });
                }
            });
        }
    }, []);

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <MapContainer
                center={[3.4516, -76.5320]}
                zoom={13}
                id="map"
                style={{ height: '100%', width: '100%' }}
                whenCreated={setMap}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default LocationPicker;
