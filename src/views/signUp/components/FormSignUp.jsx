import React, { useState } from "react"
import './FormSignUp.css'
import { Container, FormControl, Grid } from "@mui/material"
import { postUser } from './../../../services/authService'

function FormSignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [typeUser, setTypeUser] = useState('passenger');
    const [documentType, setDocumentType] = useState('CC');

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
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <Container>
            <FormControl>
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
                            <span>¿Ya tienes cuenta? <a href="login"><b>Inicia sesión</b></a></span>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <button className="btn btn-primary" type="submit" onClick={saveUser}>Registrarse</button>
                        </Grid>
                        
                    </Grid>
                </div>
            </FormControl>
        </Container>
    )
}

export default FormSignUp