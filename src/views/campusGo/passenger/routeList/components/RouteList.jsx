import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RouteList.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import location from '../../../../../assets/images/ubicacion.png';
import elipse from '../../../../../assets/images/elipse.png';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { getAllRoutes } from '../../../../../services/routeService';

function RouteList() {
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await getAllRoutes();
                setRoutes(data.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchRoutes();
    }, []);

    const handleRouteClick = (id) => {
        navigate(`/passenger/route/${id}`);
    };

    return (
        <Container
            maxWidth="xl"
            className="container poppins-light"
            sx={{ height: "82vh" }}
        >
            <Grid
                container
                p={0}
                justifyContent={'center'}
                className="container-child"
            >
                <Grid item xs={12} sm={8}>
                    <Box className="card-route">
                        <Typography sx={{ fontSize: '150%', padding: 2 }} fontWeight={'bold'} className="title-form">
                            Rutas activas:
                        </Typography>
                        {routes.length !== 0 ? routes.map((route) => {
                            const { id, data } = route;
                            const date = new Date(data.date._seconds * 1000); // Convertir segundos a milisegundos
                            const formattedDate = format(date, 'EEEE, d MMMM - p', { locale: es }); // Formatear la fecha

                            return (
                                <Box className="card-info" key={id} onClick={() => handleRouteClick(id)}>
                                    <div>{formattedDate}</div>
                                    <div className="dflex mt-01 font-weight-medium content-center">
                                        <img src={location} className="infoImages" alt="Location" />
                                        <div className="ml-03">Destino: {data.destination}</div>
                                    </div>
                                    <div className="dflex mt-03 font-weight-medium content-center">
                                        <img src={elipse} className="infoImages" alt="Elipse" />
                                        <div className="ml-03">
                                            Puntos clave: {data.waypoints.join(', ')}
                                        </div>
                                    </div>
                                </Box>
                            );
                        }) : <></>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RouteList;
