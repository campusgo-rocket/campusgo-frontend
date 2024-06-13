import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { getRoutes } from "../../../services/routesService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import TourIcon from '@mui/icons-material/Tour';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { CreateRouteComponent } from "../../../components/Modals/CreateRouteComponent";

function TravelComponent() {

    const idDriver = localStorage.getItem('idDriver');
    const [filteredData, setFilteredData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoutes();

                if (data.statusCode === 200) {
                    const filteredData = data.data.filter(item => {
                        return item.data.id_driver._path.segments[1] === idDriver;
                    });
                    setFilteredData(filteredData);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                setIsError(true);
            }
        };

        fetchData();
    }, [idDriver]);

    const formatDate = (seconds) => {
        const date = new Date(seconds * 1000);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        const formattedTime = date.toLocaleTimeString('es-ES', timeOptions);
        return `${formattedDate}, ${formattedTime}`;
    }

    const handleClickOpen = () => {
        setIsCreate(true);
    };

    const handleClose = () => {
        setIsCreate(false);
    };

    return (
        <>
            {!isError &&
                <Container className="poppins-regular">
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={6}>
                            <h2>Mis viajes</h2>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => handleClickOpen()}
                                size="medium"
                                sx={{
                                    backgroundColor: '#969696',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#D3D3D3', // Color de fondo al pasar el mouse
                                        color: 'white' // Color del texto al pasar el mouse
                                    }
                                }}
                                className="poppins-regular btn">
                                Crear ruta
                            </Button>
                        </Grid>
                    </Grid>
                    <div>
                        {filteredData.map((route, index) => (
                            <Card key={index} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <EditNoteIcon style={{ cursor: 'pointer' }} />&nbsp;
                                        <b><h3>Ruta {index + 1}</h3></b>
                                    </Box>
                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                        <p>
                                            {formatDate(route.data.date._seconds)}<br></br>
                                            <Box display="flex" alignItems="center" marginTop={1}>
                                                <LocationOnIcon />
                                                <b>Puntos clave:&nbsp;</b> {route.data.waypoints.join(", ")}
                                            </Box>
                                            <Box display="flex" alignItems="center" marginTop={1}>
                                                <NearMeIcon />
                                                <b>Origen:&nbsp;</b> {route.data.origin}<br></br>
                                            </Box>
                                            <Box display="flex" alignItems="center" marginTop={1}>
                                                <TourIcon />
                                                <b>Destino:&nbsp;</b> {route.data.destination}<br></br>
                                            </Box>
                                            <br></br>
                                            <b>Precio:</b> {route.data.price} COP<br></br>
                                            <b>Capacidad:</b> {route.data.seating_capacity}
                                        </p>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>}
            {isCreate && (
                <Dialog open={isCreate} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogContent>
                        <CreateRouteComponent />
                    </DialogContent>
                </Dialog>
            )}
            {isError && <p>Error al cargar la información.</p>}
        </>
    )
}

export { TravelComponent };