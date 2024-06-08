import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, DialogActions, DialogContent, DialogContentText, FormControl, Grid } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";
import { postUser, postDriver, postPassenger, getUser, putUser } from './../../../services/authService';
import ImagePortrait from '../../../assets/images/fondo_registro.png';
import './FormProfile.css';

import { useUser } from "../../../contexts/userContext";

function EditProfile() {
    const navigate = useNavigate();
    const { userType } = useUser();
    const [typeUser, setTypeUser] = useState('');
    const [typeUserSpanish, setTypeUserSpanish] = useState('');
    const { userId } = useParams();

    const [savedUid, setSavedUid] = useState('');
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        documentNumber: '',
        documentType: 'CC',
        address: '',
        phoneNumber: '',
    });

    const [isEditable, setIsEditable] = useState(false);
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

        // Fetch user data
        const fetchUserData = async () => {
            try {
                const userData = await getUser(userId);
                setFormValues({
                    firstName: userData.data.first_name,
                    lastName: userData.data.last_name,
                    email: userData.data.email,
                    documentNumber: userData.data.document_number,
                    documentType: userData.data.document_type,
                    address: userData.data.address,
                    phoneNumber: userData.data.phone_number,
                    url_profile_photo: userData.data.url_profile_photo,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userType, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues, [name]: value
        }));
    };

    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
    };

    const saveUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            email: formValues.email,
            document_number: formValues.documentNumber,
            document_type: formValues.documentType,
            address: formValues.address,
            phone_number: formValues.phoneNumber,
            url_profile_photo: formValues.url_profile_photo,
        };

        try {
            if (userId) {
                await putUser(userId, user);
                setIsSuccess(true);
            } else {
                const res = await postUser(user);
                setSavedUid(res.userId);
                localStorage.setItem('userId', res.userId);
                if (typeUser === 'driver') {
                    await postDriver({ userId: res.userId });
                } else if (typeUser === 'passenger') {
                    await postPassenger({ userId: res.userId });
                }
                setIsSuccess(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsEditable(false);
        }
    };

    const handleClose = () => {
        setIsError(false);
        setIsSuccess(false);
    };

    const handleSuccess = () => {
        navigate(`/user/profile/${savedUid}`);
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
                                    <input
                                        className={`input-form ${!isEditable && 'readonly-input'}`}
                                        name="firstName"
                                        onChange={handleChange}
                                        value={formValues.firstName}
                                        placeholder={formValues.firstName}
                                        readOnly={!isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${!isEditable && 'readonly-input'}`}
                                        name="lastName"
                                        onChange={handleChange}
                                        value={formValues.lastName}
                                        placeholder={formValues.lastName}
                                        readOnly={!isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${!isEditable && 'readonly-input'}`}
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        value={formValues.phoneNumber}
                                        placeholder={formValues.phoneNumber}
                                        readOnly={!isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${true && 'readonly-input'}`}
                                        name="email"
                                        value={formValues.email}
                                        placeholder={formValues.email}
                                        type="email"
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${true && 'readonly-input'}`}
                                        name="documentNumber"
                                        value={formValues.documentNumber}
                                        placeholder={formValues.documentNumber}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${true && 'readonly-input'}`}
                                        name="documentType"
                                        value={formValues.documentType}
                                        placeholder={formValues.documentType}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <input
                                        className={`input-form ${true && 'readonly-input'}`}
                                        name="address"
                                        value={formValues.address}
                                        placeholder={formValues.address}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={isEditable ? saveUser : toggleEdit}
                                    >
                                        {isEditable ? 'Guardar Cambios' : 'Editar'}
                                    </button>
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
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Continuar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}

export default EditProfile;
