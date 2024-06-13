import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import './CreateRouteComponent.css';

function CreateRouteComponent() {

    const idDriver = localStorage.getItem('idDriver');
    
    const [formData, setFormData] = useState({
        id_driver: idDriver,
        date: "",
        origin: "",
        destination: "",
        price: 0,
        seating_capacity: 0,
        waypoints: [""],
        latitude_origin: 3.45407,
        longitude_origin: -76.48188,
        latitude_destination: 3.55098,
        longitude_destination: -76.298088,
        distance: "13km",
        estimate_time: "33min",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Aquí podrías enviar los datos a tu backend
    };

    return (
        <Container maxWidth="sm" className="hola">
            <h2>Mis viajes</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    name="date"
                    label="Fecha y Hora"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    required
                    name="origin"
                    label="Origen"
                    value={formData.origin}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    required
                    name="destination"
                    label="Destino"
                    value={formData.destination}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    required
                    name="price"
                    label="Precio"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    required
                    name="seating_capacity"
                    label="Capacidad de Asientos"
                    type="number"
                    value={formData.seating_capacity}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    name="waypoints"
                    label="Puntos clave (separados por comas)"
                    value={formData.waypoints.join(",")}
                    onChange={handleChange}
                    margin="normal"
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    CREAR VIAJE
                </button>&nbsp;
                <button
                    className="btn btn-secondary"
                    type="submit"
                >
                    CANCELAR
                </button>
            </form>
        </Container>
    );
}

export { CreateRouteComponent };