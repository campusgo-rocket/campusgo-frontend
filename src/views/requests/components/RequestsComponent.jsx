import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";
import { getRoutes } from "../../../services/routesService";
import { getReservations } from "../../../services/reservationsService";

function RequestsComponent() {
    const idDriver = localStorage.getItem('idDriver');
    const [filteredReservations, setFilteredReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const routesResponse = await getRoutes();
                console.log(routesResponse)
                const driverRoutes = routesResponse.data.map(route => route.id);
                const reservationsResponse = await getReservations();
                console.log(reservationsResponse)

                const filteredReservations = reservationsResponse.data.filter(reservation =>
                    driverRoutes.includes(reservation.data.id_route._path.segments[1])
                );
                console.log(filteredReservations)
                setFilteredReservations(filteredReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [idDriver]);

    return (
        <Container maxWidth="md">
            <h2>Mis reservas</h2>
            {filteredReservations.map((reservation, index) => (
                <Card key={index} style={{ marginBottom: "10px" }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Reserva ID: {reservation.data.id}
                        </Typography>
                        <Typography variant="body1">
                            Punto de recogida: {reservation.data.pick_up_point}
                        </Typography>
                        <Typography variant="body1">
                            Método de pago: {reservation.data.payment_method}
                        </Typography>
                        <Typography variant="body1">
                            Estado de la reserva: {reservation.data.reservation_status}
                        </Typography>
                        <Typography variant="body1">
                            Precio de la reserva: {reservation.data.fare}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export { RequestsComponent };
