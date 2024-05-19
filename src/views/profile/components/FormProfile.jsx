import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, DialogActions, DialogContent, DialogContentText, FormControl, Grid, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";
import { postUser, postDriver, postPassenger } from './../../../services/authService';
import ImagePortrait from '../../../assets/images/fondo_registro.png';
import './FormSignUp.css';

import { useUser } from "../../../contexts/userContext";

function EditProfile() {
    const navigate = useNavigate();
    const { setUid, userType } = useUser();
    const [typeUser, setTypeUser] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        idUser: '',
        documentType: 'CC',
        address: '',
        phoneNumber: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (userType === 'passenger') {
            localStorage.setItem('userType', 'passenger');
            setTypeUser('passenger');
            setTypeUserSpanish('Pasajero');
        } else if (userType === 'driver') {
            localStorage.setItem('userType', 'driver');
            setTypeUser('driver');
            setTypeUserSpanish('Conductor');
        }
    }, [userType]);

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const saveUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let user = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            phone_number: phoneNumber,
            url_profile_photo: 'none'
        }
        postUser(user)
            .then((res) => {
                setUid(res.uid);
                localStorage.setItem('uid', res.uid);
                if (typeUser === 'driver') {
                    postDriver({ uid: res.uid })
                    .then(() => {
                        setIsLoading(false);
                        setIsSuccess(true);
                    })
                    .catch(() => {
                        setIsLoading(false);
                        setIsError(true);
                    })
                } else if (typeUser === 'passenger') {
                    postPassenger({ uid: res.uid })
                    .then(() => {
                        setIsLoading(false);
                        setIsSuccess(true);
                    })
                    .catch(() => {
                        setIsLoading(false);
                        setIsError(true);
                    })
                }
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            })
    }

    const handleClose = () => {
        setIsError(false);
    }

    const handleSuccess = () => {
        navigate('/profile'); // Redirige a la página de perfil
    };

    return (
        <Container maxWidth="xl">
            {!isLoading && (
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={8} md={8} className="container-child-singup">
                        <FormControl className="card-form">
                            <Grid container className='poppins-light'>
                                <Grid item xs={12} sm={12} md={12}>
                                    <h2 className="title-form">Editar Perfil</h2>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeFirstName} placeholder="Nombres"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeLastName} placeholder="Apellidos"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangePassword} placeholder="Contraseña" type="password"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangePhoneNumber} placeholder="Número de celular"></input>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <button className="btn btn-primary" type="submit" onClick={(e) => saveUser(e)}>{ typeUser === 'passenger' ? 'Registrarse' : 'Guardar Cambios'}</button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} display={{ xs: 'none', sm: 'none', md: 'flex' }} sx={{ justifyContent: 'flex-end' }}>
                        <img className="img-register" src={ImagePortrait} alt="Edit Profile" />
                    </Grid>
                </Grid>
            )}
            {isLoading && <LoadingComponent color="inherit" />}
            {!isLoading && isError && (
                <Dialog open={isError} onClose={handleClose}>
                    <DialogTitle>{"Opps! Error al actualizar el perfil."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Por favor verifica la información y vuelve a intentarlo.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {!isLoading && isSuccess && (
                <Dialog open={isSuccess} onClose={handleSuccess}>
                    <DialogTitle>{"Cool! El perfil ha sido actualizado con éxito."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Felicitaciones {formValues.firstName}, tu perfil ha sido actualizado correctamente.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuccess} color="secondary" autoFocus>
                            Continuar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}

export default EditProfile;
