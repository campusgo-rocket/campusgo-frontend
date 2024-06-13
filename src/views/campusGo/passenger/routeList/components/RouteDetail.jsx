import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoute } from '../../../../../services/routeService';
import { getDriverById, getUser } from '../../../../../services/authService';
import { getVehicleByDriverId } from '../../../../../services/vehicleService';
import Container from '@mui/material/Container';
import { Box, Typography, Grid, Button } from '@mui/material';
import locationImage from '../../../../../assets/images/ubicacion.png'
import elipse from '../../../../../assets/images/elipse.png';
import reloj from '../../../../../assets/images/reloj-viaje.png';
import LocationPickerModal from './LocationPickerModal'; // Importa el componente LocationPickerModal
import './RouteList.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LocationPicker from './LocationPicker';

function RouteDetail() {
    const { id } = useParams();
    const [route, setRoute] = useState(null);
    const [driver, setDriver] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [modalOpen, setModalOpen] = useState(false);

    const handleLocationSelect = (coords) => {
        console.log(coords)
        setLocation(coords);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario con la ubicación seleccionada
        console.log('Ubicación seleccionada:', location);
        setModalOpen(false); // Cerrar el modal después de enviar
    };

    useEffect(() => {
        const fetchRouteDetails = async () => {
            try {
                const routeData = await getRoute(id);
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
    }, [id]);

    if (!route || !driver || !vehicle) {
        return <div>Loading...</div>;
    }

    const { data: routeData } = route;
    const date = new Date(routeData.date._seconds * 1000); // Convertir segundos a milisegundos
    const formattedDate = format(date, 'EEEE, d MMMM - p', { locale: es }); // Formatear la fecha

    return (
        <Container maxWidth="xl" className="container poppins-light" sx={{ height: '82vh' }}>  
            <Box className="card-route">
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6} className="card-info" m={1}>
                                <Typography variant="body1" component="div">
                                    <b>
                                        {driver.data.first_name} {driver.data.last_name}, aceptó tu viaje
                                    </b>
                                </Typography>
                                <Typography variant="body2" component="div">{formattedDate}</Typography>
                                <div className="dflex mt-05 font-weight-medium content-center">
                                    <img src={locationImage} className="infoImages" alt="Location" />
                                    <div className="ml-03">Destino: {routeData.destination}</div>
                                </div>
                                <div className="dflex font-weight-medium mt-01 content-center">
                                    <img src={elipse} alt="Waypoint" />
                                    <div className="ml-03">Puntos clave: {routeData.waypoints.join(', ')}</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} className="card-info" m={1}>
                                <div className="left-border">
                                    <div className="ml-05">
                                        <div className="dblock font-weight-medium">
                                            Información del vehiculo:
                                            <div className="font-weight-bold">
                                                {vehicle.data.model} - {vehicle.data.plate_number}, {vehicle.data.color}
                                            </div>
                                        </div>
                                        <div className="mt-05 text-small">
                                            <div className="dflex mt-05 font-weight-medium content-center">
                                                <img src={elipse} alt="Meet Point" />
                                                <div className="ml-03">Punto de encuentro: {routeData.waypoints[0]}</div>
                                            </div>
                                            <div className="dflex font-weight-medium mt-01 content-center">
                                                <img src={reloj} alt="Estimated Time" />
                                                <div className="ml-03">Hora estimada: {routeData.estimate_time}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>       
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocationPicker onLocationSelect={handleLocationSelect}/>
                            {console.log(location)}
                        <Button mt={3} variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                            Solicitar viaje
                        </Button>
                    </Grid>
                </Grid>
               
                
            </Box>    
        </Container>
    );
}

export default RouteDetail;
