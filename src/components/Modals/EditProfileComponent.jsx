import React, { useState } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import './styles.css';
import { LoadingComponent } from "../LoadingComponent/Loading";
import { updateUser } from "../../services/authService";// Asume que tienes un servicio para actualizar el perfil

function EditProfileComponent({ handleClose, handleUpdate }) {
    const userData = {
        "document_type": "CC",
        "document_number": 123456789,
        "first_name": "Juan",
        "last_name": "Perez",
        "email": "juan.perez@example.com",
        "phone_number": "+573001234567",
        "address": "Calle 123 #45-67",
        "url_profile_photo": "http://example.com/photo.jpg"
    };

    const [formData, setFormData] = useState({
        document_type: userData.document_type,
        document_number: userData.document_number,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: userData.phone_number,
        address: userData.address
    });

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        
        // Aquí podrías validar los campos antes de enviar la solicitud al servidor

        updateUser(formData) // Suponiendo que tienes una función para actualizar el perfil en userService
            .then(() => {
                handleUpdate();
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            });
    };

    return (
        <>
            {!isError &&
                <Container maxWidth="sm">
                    <h2>Editar perfil</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            required
                            name="first_name"
                            label="Nombre"
                            value={formData.first_name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="last_name"
                            label="Apellido"
                            value={formData.last_name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="document_type"
                            label="Tipo de documento"
                            value={formData.document_type}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="document_number"
                            label="Número de documento"
                            type="number"
                            value={formData.document_number}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="phone_number"
                            label="Número de teléfono"
                            value={formData.phone_number}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="address"
                            label="Dirección"
                            value={formData.address}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <button className="btn btn-primary" type="submit">
                            ACTUALIZAR PERFIL
                        </button>&nbsp;
                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            CANCELAR
                        </button>
                    </form>
                </Container>}
            {isError && <p>Ocurrió un error al actualizar el perfil.</p>}
            {isLoading && !isSuccess && <LoadingComponent color="inherit" />}
            {isSuccess && !isLoading &&
                <Dialog
                    open={isSuccess}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Perfil actualizado con éxito."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tu perfil ha sido actualizado correctamente.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>}
        </>
    );
}

export { EditProfileComponent };
