import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../../../../services/reservationService';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import './ReservationList.css';


function ReservationsList() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getAllReservations();
                setReservations(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container maxWidth="xl" className="poppins-light" sx={{ height: "82vh" }}>
            <Grid container justifyContent="center" className="container-child">
                <Grid item xs={12} sm={8}>
                    <Box className="card-route">
                        <Typography variant="h4" gutterBottom sx={{ fontSize: '150%', padding: 2 }} fontWeight="bold" className="title-form">
                            Lista de Reservas
                        </Typography>
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <Box  className="card-info" key={reservation.id} mb={2} p={2} borderRadius={4} onClick={() => handleReservationClick(reservation.id)}>
                                    <Typography variant="body1"><b>ID:</b> {reservation.id}</Typography>
                                    <Typography variant="body1"><b>Estado:</b> {reservation.data.reservation_status}</Typography>
                                    <Typography variant="body1"><b>Método de pago:</b> {reservation.data.payment_method}</Typography>
                                    <Typography variant="body1"><b>Punto de encuentro:</b> {reservation.data.pick_up_point}</Typography>
                                    <Typography variant="body1"><b>Cantidad de puestos:</b> {reservation.data.seats_to_reserve}</Typography>
                                    <Typography variant="body1"><b>Tarifa:</b> $ {reservation.data.fare}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography>No hay reservas disponibles</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ReservationsList;
