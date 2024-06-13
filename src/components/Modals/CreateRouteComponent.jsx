import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import './styles.css';
import { postRoute } from "../../services/routesService";
import { LoadingComponent } from "../LoadingComponent/Loading";

function CreateRouteComponent({ handleClose, handleCreate }) {

    const idDriver = localStorage.getItem('idDriver');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id_driver: idDriver,
        date: new Date(),
        origin: "",
        destination: "",
        price: 0,
        seating_capacity: 0,
        waypoints: [],
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
        setIsLoading(true);
        formData.price = parseFloat(formData.price);
        formData.seating_capacity = parseFloat(formData.seating_capacity);
        formData.date = new Date(formData.date);
        postRoute(formData)
            .then(() => {
                handleCreate();
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            })
    };

    return (
        <>
            {!isError &&
                <Container maxWidth="sm">
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
                            value={formData.waypoints}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <button className="btn btn-primary" type="submit">
                            CREAR VIAJE
                        </button>&nbsp;
                        <button className="btn btn-secondary" type="submit" onClick={handleClose}>
                            CANCELAR
                        </button>
                    </form>
                </Container>}
            {isError && <p>Ocurrió un error al crear la ruta.</p>}
            {isLoading && !isSuccess && <LoadingComponent color="inherit" />}
            {isSuccess && !isLoading &&
                <Dialog
                    open={isSuccess}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Cool! La ruta se ha creado con éxito."}
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            style={{ color: "red" }}
                            autoFocus
                        >
                            CONTINUAR
                        </Button>
                    </DialogActions>
                </Dialog>}
        </>
    );
}

export { CreateRouteComponent };