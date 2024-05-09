import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, DialogActions, DialogContent, DialogContentText, FormControl, Grid } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { postUser } from './../../../services/authService'
import './FormSignUp.css'
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";

function FormSignUp() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [typeUser, setTypeUser] = useState('passenger');
    const [documentType, setDocumentType] = useState('CC');

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const handleChangeTypeUser = (e) => {
        setTypeUser(e.target.value);
    }

    const handleChangeDocumentType = (e) => {
        setDocumentType(e.target.value);
    }

    const saveUser = () => {
        setIsLoading(true);
        let user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            id_user: idUser,
            type: typeUser,
            document_type: documentType
        }
        postUser(user)
        .then(() => {
            setIsLoading(false);
            setIsSuccess(true);
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
        navigate('/profile');
    }

    return(
        <Container>
            {!isLoading &&
                <FormControl>
                    <Grid container>
                        <Grid item xs={12} sm={8} md={8}>
                            <div className="card-form">
                                <Grid container className='poppins-light'>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <h2 className="title-form">Registro</h2>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <input className="input-form" onChange={handleChangeFirstName} placeholder="Nombres"></input>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <input className="input-form" onChange={handleChangeLastName} placeholder="Apellidos"></input>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <input className="input-form" onChange={handleChangeEmail} placeholder="Correo institucional"></input>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <select 
                                            className="input-form"
                                            style={{height: 50, width: 298}}
                                            onChange={handleChangeDocumentType}
                                            value={documentType}
                                            name="document_type" id="document_type"
                                        >
                                            <option value="CC">Cédula de ciudadanía</option>
                                            <option value="TI">Tarjeta de identidad</option>
                                        </select>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <input className="input-form" onChange={handleChangePassword} placeholder="Contraseña" type="password"></input>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <input className="input-form" onChange={handleChangeIdUser} placeholder="Número de documento"></input>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <select 
                                            style={{height: 50, width: 298}}
                                            className="input-form" 
                                            onChange={handleChangeTypeUser}
                                            value={typeUser}
                                            name="type" 
                                            id="type"
                                        >
                                            <option value="drive">Conductor</option>
                                            <option value="passenger">Pasajero</option>
                                        </select>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <br></br>
                                        <span>¿Ya tienes cuenta? <a href="login"><b>Inicia sesión</b></a></span>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <button className="btn btn-primary" type="submit" onClick={saveUser}>Registrarse</button>
                                    </Grid>
                                    
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </FormControl>
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
                    {"Opps! Error al intentar crear el usuario."}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Por favor verifica la información y vuelve a intentarlo.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} style={{color: "red"}} autoFocus>
                        CERRAR
                    </Button>
                    </DialogActions>
                </Dialog>
            }
            {!isLoading && isSuccess &&
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
                        Felicitaciones {firstName}, ahora podrás hacer uso de nuestro servicio de transporte universitario.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCreatedUser} style={{color: "red"}} autoFocus>
                        CONTINUAR
                    </Button>
                    </DialogActions>
                </Dialog>
            }
        </Container>
    )
}

export default FormSignUp