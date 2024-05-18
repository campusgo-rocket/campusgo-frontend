import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, DialogActions, DialogContent, DialogContentText, FormControl, Grid } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";
import { postUser, postDriver, postPassenger } from './../../../services/authService';
import ImagePortrait from '../../../assets/images/fondo_registro.png';
import './FormVehicle.css';

import { useUser } from "../../../contexts/userContext";

function FormSignUp() {

    const navigate = useNavigate();

    const { setUid, userType } = useUser();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [documentType, setDocumentType] = useState('CC');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [typeUser, setTypeUser] = useState('');
    const [typeUserSpanish, setTypeUserSpanish] = useState('');

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

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeIdUser = (e) => {
        setIdUser(e.target.value);
    }

    const handleChangeDocumentType = (e) => {
        setDocumentType(e.target.value);
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
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
            email: email,
            password: password,
            document_number: idUser,
            document_type: documentType,
            address: address,
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

    const handleCreatedUser = () => {
        navigate('/passenger/profile');
    }

    const handleCreatedDriver = () => {
        navigate('/driver/vehicle');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <Container maxWidth="xl">
            {!isLoading &&
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={8} md={8} className="container-child-singup" padding={'none'}>
                        <FormControl className="card-form">
                            <Grid container className='poppins-light'>
                                <Grid item xs={12} sm={12} md={12}>
                                    <h2 className="title-form">Registro de vehículo</h2>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeFirstName} placeholder="Marca del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeLastName} placeholder="Modelo del vehículo"></input>
                                </Grid>    
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangePassword} placeholder="Año del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangePhoneNumber} placeholder="Color del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <select
                                        className="input-form"
                                        style={{ height: 50, width: 298 }}
                                        onChange={handleChangeDocumentType}
                                        value={documentType}
                                        name="document_type" id="document_type"
                                    >
                                        <option value="CC">Cédula de ciudadanía</option>
                                        <option value="TI">Tarjeta de identidad</option>
                                    </select>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeIdUser} placeholder="Número de documento del propietario"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeEmail} placeholder="Nombre del propietario"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeAddress} placeholder="Placa del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <br></br>
                                    <span>¿Ya tienes cuenta? <a onClick={handleLogin}><b>Inicia sesión</b></a></span>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <button className="btn btn-primary" type="submit" onClick={(e) => saveUser(e)}>{ typeUser === 'passenger' ? 'Registrarse' : 'Registrar vehículo'}</button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} display={{ xs: 'none', sm: 'none', md: 'flex' }} sx={{ justifyContent: 'flex-end' }}>
                        <img className="img-register" src={ImagePortrait}></img>
                    </Grid>
                </Grid>

            }
            {isLoading &&
                <LoadingComponent color="inherit" />
            }
            {!isLoading && isError &&
                <Dialog
                    open={isError}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Opps! Error al crear el usuario."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Por favor verifica la información y vuelve a intentarlo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ color: "red" }} autoFocus>
                            CERRAR
                        </Button>
                    </DialogActions>
                </Dialog>
            }
            {!isLoading && isSuccess && typeUser === 'passenger' &&
                <Dialog
                    open={isSuccess}
                    onClose={handleCreatedUser}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Cool! El usuario ha sido creado con éxito."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Felicitaciones {firstName}, haz creado tu cuenta, ahora podrás hacer uso de nuestro servicio de transporte universitario.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreatedUser} style={{ color: "red" }} autoFocus>
                            CONTINUAR
                        </Button>
                    </DialogActions>
                </Dialog>
            }
            {!isLoading && isSuccess && typeUser === 'driver' &&
                <Dialog
                    open={isSuccess}
                    onClose={handleCreatedDriver}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Cool! El usuario ha sido creado con éxito."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Felicitaciones {firstName}, haz creado tu cuenta, ahora por favor registra la información de tu vehículo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreatedDriver} style={{ color: "red" }} autoFocus>
                            CONTINUAR
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Container>
    )
}

export default FormSignUp