import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Container, Dialog, DialogContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { getUser } from "../../../services/authService";
import { getVehicle } from "../../../services/vehicleService";

import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUser } from "../../../contexts/userContext";
import { EditProfileComponent } from "../../../components/Modals/EditProfileComponent";

function ProfileComponent() {

    const { uid } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const [color, setColor] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [typeVehicle, setTypeVehicle] = useState('');
    const [year, setYear] = useState('');

    const [isDriver, setIsDriver] = useState(false);
    // const [isPassenger, setIsPassenger] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getUser(uid);
            const data = res.data;

            setFirstName(data.first_name);
            setLastName(data.last_name);
            setDocumentType(data.document_type);
            setDocumentNumber(data.document_number);
            setEmail(data.email);
            setPhoneNumber(data.phone_number);
            setAddress(data.address);
            setIsDriver(data.isDriver);

            if (data.isDriver) {
                const idDriver = data.id_driver._path.segments[1];
                localStorage.setItem('idDriver', idDriver);
                const idVehicle = data.driverData.id_vehicle._path.segments[1];
                const vehicleRes = await getVehicle(idVehicle);
                const vehicleData = vehicleRes.data;
                setColor(vehicleData.color);
                setMake(vehicleData.make);
                setModel(vehicleData.model);
                setPlateNumber(vehicleData.plate_number);
                setTypeVehicle(vehicleData.type_vehicle);
                setYear(vehicleData.year);
            }

            setProfilePhoto(data.url_profile_photo);
        } catch (error) {
            setIsError(true);
        }
    };
    
    const handleClickOpen = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    };

    const handleEdit = () => {
        fetchData();
    }

    return(
        <>
            {!isError && 
            <Container className="poppins-regular">
                <h2>Mi perfil</h2>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <Avatar
                                sx={{ width: 70, height: 70 }}
                                src={profilePhoto}
                            /><br></br>
                            <Typography variant="h9" sx={{ marginLeft: 2 }} className="poppins-regular">
                                <br></br>
                                <b><h3>{firstName + ' ' + lastName}</h3></b>
                                {isDriver && <p>Conductor</p>}
                                {!isDriver && <p>Pasajero</p>}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <br></br>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <EditNoteIcon style={{cursor: 'pointer'}} />&nbsp;
                            <b><h3>Información personal</h3></b>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <b><b>Nombres</b></b>
                                <p>{firstName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <b><b>Apellidos</b></b>
                                <p>{lastName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <b><b>Tipo de documento</b></b>
                                <p>{documentType}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <b><b>ID</b></b>
                                <p>{documentNumber}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <b><b>Correo electrónico</b></b>
                                <p>{email}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <b><b>Celular</b></b>
                                <p>{phoneNumber}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <b><b>Dirección</b></b>
                                <p>{address}</p>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <br></br>
                {isDriver && (
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <EditNoteIcon style={{cursor: 'pointer'}} />&nbsp;
                                <b><h3>Datos del vehículo</h3></b>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <b><b>Tipo de vehículo</b></b>
                                    <p>{typeVehicle}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <b><b>Color</b></b>
                                    <p>{color}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <b><b>Marca</b></b>
                                    <p>{make}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <b><b>Modelo</b></b>
                                    <p>{model}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <b><b>Número de placa</b></b>
                                    <p>{plateNumber}</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <b><b>Año</b></b>
                                    <p>{year}</p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Container>}
            {isError && <p>Error al cargar la información.</p>}
            {isEdit && (
                <Dialog open={isEdit} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogContent>
                        <EditProfileComponent handleClose={handleClose} handleCreate={handleEdit}/>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export { ProfileComponent };