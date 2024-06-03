import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, DialogActions, DialogContent, DialogContentText, FormControl, Grid } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";
import { postUser, postDriver, postPassenger } from './../../../services/authService';
import ImagePortrait from '../../../assets/images/fondo-registro-vehiculo.png';
import './FormVehicle.css';

import { useUser } from "../../../contexts/userContext";
import { postVehicle } from "../../../services/vehicleService";

function FormSignUp() {

    const navigate = useNavigate();

    const [model, setModel] = useState('');
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');
    //const [idDriver, setIdDriver] = useState("vSlY7KpNsHKuV1qrri70");
    const [plateNumber, setPlateNumber] = useState('');
    const [typeVehicle, setVehicleType] = useState('Carro');
    const [color, setColor] = useState('');
    const [savedUid, setSavedUid] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Utiliza useParams para obtener el userId de la URL
    const { userId } = useParams();

    useEffect(() => {
        
    }, []);

    const handleChangePlateNumber = (e) => {
        setPlateNumber(e.target.value);
    }

    const handleChangeMake = (e) => {
        setMake(e.target.value);
    }

    const handleChangeModel = (e) => {
        setModel(e.target.value);
    }

    const handleChangeYear = (e) => {
        setYear(e.target.value);
    }

    const handleChangeIdDriver = (e) => {
        setIdDriver(e.target.value);
    }

    const handleChangeVehicleType = (e) => {
        setVehicleType(e.target.value);
    }

    const handleChangeColor = (e) => {
        setColor(e.target.value);
    }

    const handleCreatedVehicle = (e) => {
        navigate(`/user/profile/${userId}`);
    }

    const saveVehicle = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let vehicle = {
            color: color,
            make: make,
            model: model,
            year: year,
            plate_number: plateNumber,
            id_driver: userId,
            type_vehicle: typeVehicle
        }
        postVehicle(vehicle)
            .then((res) => {
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
                                    <input className="input-form" onChange={handleChangeMake} placeholder="Marca del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeModel} placeholder="Modelo del vehículo"></input>
                                </Grid>    
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeYear} placeholder="Año del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangeColor} placeholder="Color del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <select
                                        className="input-form"
                                        style={{ height: 50, width: 298 }}
                                        onChange={handleChangeVehicleType}
                                        value={typeVehicle}
                                        name="type_vehicle" id="type_vehicle"
                                    >
                                        <option value="carro">Carro</option>
                                        <option value="moto">Moto</option>
                                    </select>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input className="input-form" onChange={handleChangePlateNumber} placeholder="Placa del vehículo"></input>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <button className="btn btn-primary" type="submit" onClick={(e) => saveVehicle(e)}>Registrar vehículo</button>
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
                        {"Opps! Error al crear el vehículo."}
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
            {!isLoading && isSuccess &&
                <Dialog
                    open={isSuccess}
                    onClose={handleCreatedVehicle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Cool! El vehículo ha sido creado con éxito."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Felicitaciones, haz guardado con éxito los datos de tu vehículo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreatedVehicle} style={{ color: "red" }} autoFocus>
                            CONTINUAR
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Container>
    )
}

export default FormSignUp