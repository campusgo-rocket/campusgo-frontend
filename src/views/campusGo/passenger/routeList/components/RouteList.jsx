import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RouteList.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import location from '../../../../../assets/images/ubicacion.png';
import elipse from '../../../../../assets/images/elipse.png';
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import RouteDetailModal from './RouteDetailModal';
import { getAllRoutes } from '../../../../../services/routeService';

function RouteList() {
    const [routes, setRoutes] = useState([]);
    const [selectedRouteId, setSelectedRouteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setSelectedRouteId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRouteId(null);
    };

    return (
        <Container
            maxWidth="xl"
            className="poppins-light"
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
                            const parsedDate = parseISO(data.date);

                            if (!isValid(parsedDate)) {
                                console.error(`Fecha inválida para la ruta con ID: ${id}`);
                                return null;
                            }

                            const formattedDate = format(parsedDate, "EEEE, d MMMM 'a las' p", { locale: es });

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
                                            Puntos clave: {data.waypoints}
                                        </div>
                                    </div>
                                </Box>
                            );
                        }) : <div>No hay rutas disponibles</div>}
                    </Box>
                </Grid>
            </Grid>
            {selectedRouteId && (
                <RouteDetailModal
                    routeId={selectedRouteId}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </Container>
    );
}

export default RouteList;
