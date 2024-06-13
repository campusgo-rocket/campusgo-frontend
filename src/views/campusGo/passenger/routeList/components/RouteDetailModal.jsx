import React, { useEffect, useState } from 'react';
import { getRoute } from '../../../../../services/routeService';
import { getDriverById, getUser } from '../../../../../services/authService';
import { getVehicleByDriverId } from '../../../../../services/vehicleService';
import { createReservation } from '../../../../../services/reservationService';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogContent } from '@mui/material';
import locationImage from '../../../../../assets/images/ubicacion.png';
import elipse from '../../../../../assets/images/elipse.png';
import reloj from '../../../../../assets/images/reloj-viaje.png';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUser } from "../../../../../contexts/userContext";

function RouteDetailModal({ routeId, isOpen, onClose }) {
    const { uid } = useUser();
    const [route, setRoute] = useState(null);
    const [driver, setDriver] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [meetingPoint, setMeetingPoint] = useState('');
    const [seatsCount, setSeatsCount] = useState(1);
    const [paymentType, setPaymentType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id_passenger: uid,
            id_route:routeId,
            seats_to_reserve: seatsCount,
            payment_method:paymentType,
            pick_up_point:meetingPoint,
            reservation_status: 'Pendiente',
            fare:routeData.price

        };

        try {
            const response = await createReservation(formData);
            console.log('Reservation created:', response);
            onClose(); // Cerrar el modal después de enviar
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    useEffect(() => {
        if (routeId) {
            const fetchRouteDetails = async () => {
                try {
                    const routeData = await getRoute(routeId);
                    setRoute(routeData);

                    const driverId = routeData.data.id_driver._path.segments[1];
                    const driverVehicle = await getDriverById(driverId);
                    const driverData = await getUser(driverId);
                    setDriver(driverData);

                    const vehicleId = driverVehicle.data.id_vehicle._path.segments[1];
                    const vehicleData = await getVehicleByDriverId(vehicleId);
                    setVehicle(vehicleData);
                } catch (error) {
                    console.error(error.message);
                }
            };

            fetchRouteDetails();
        }
    }, [routeId]);

    if (!route || !driver || !vehicle) {
        return <div>Loading...</div>;
    }

    const { data: routeData } = route;
    const date = new Date(routeData.date._seconds * 1000);
    const formattedDate = format(date, 'EEEE, d MMMM - p', { locale: es });

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent>
                <Box 
                    p={3} 
                    sx={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflowY: 'none',
                        margin: 'auto',
                        backgroundColor: 'white',
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Detalles del Viaje
                    </Typography>
                    <Box mb={2}>
                        <Typography variant="body1">
                            <b>{driver.data.first_name} {driver.data.last_name} aceptó tu viaje</b>
                        </Typography>
                        <Typography variant="body2">{formattedDate}</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                            <img src={locationImage} alt="Location" style={{ marginRight: 8 }} />
                            <Typography>Destino: {routeData.destination}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                            <img src={elipse} alt="Waypoint" style={{ marginRight: 8 }} />
                            <Typography>Puntos clave: {routeData.waypoints.join(', ')}</Typography>
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="body1">
                            Información del vehículo:
                        </Typography>
                        <Typography variant="body2">
                            <b>{vehicle.data.model} - {vehicle.data.plate_number}, {vehicle.data.color}</b>
                        </Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                            <img src={elipse} alt="Meet Point" style={{ marginRight: 8 }} />
                            <Typography>Punto de encuentro: {routeData.waypoints[0]}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                            <img src={reloj} alt="Estimated Time" style={{ marginRight: 8 }} />
                            <Typography>Hora estimada: {routeData.estimate_time}</Typography>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                label="Punto de encuentro"
                                variant="outlined"
                                fullWidth
                                value={meetingPoint}
                                onChange={(e) => setMeetingPoint(e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Cantidad de puestos"
                                variant="outlined"
                                select
                                fullWidth
                                value={seatsCount}
                                onChange={(e) => setSeatsCount(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map((count) => (
                                    <MenuItem key={count} value={count}>{count}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="payment-type-label">Tipo de pago</InputLabel>
                                <Select
                                    labelId="payment-type-label"
                                    id="payment-type-select"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    label="Tipo de pago"
                                >
                                    <MenuItem value="Efectivo">Efectivo</MenuItem>
                                    <MenuItem value="Nequi">Nequi</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Solicitar viaje
                        </Button>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default RouteDetailModal;
