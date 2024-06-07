import React from 'react';
import './HomeTermsComponent.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import sosIcon from '../../../assets/images/sos.png';
import universityIcon from '../../../assets/images/universidad.png';
import locationIcon from '../../../assets/images/ubicacion.png';

function InfoHome() {
    return (  
        <Container maxWidth="xl" className='container-Terms poppins-light'>
        <Grid container spacing={2} className='container-child-Terms' sx={{ height: '100%' }}>
            <Grid item xs={12} sm={6}>
                <h1 className="Terms-heading">¿Quieres ser conductor o pasajero?</h1>
                <h1 className="Terms-secondary">Lee aquí más información sobre cómo iniciar</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card 
                sx={{
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 
                    borderRadius: '15px',}}>
                    <CardContent className='content-card'>
                        <Typography className='terms-text' variant="body2" component="p" sx={{ marginTop: '10%' }}>
                        Regístrate utilizando tu correo electrónico universitario para verificar tu identidad. Además, si eres conductor, deberás registrar los datos de tu vehículo para poder ofrecer viajes seguros a otros estudiantes.
                        ¿Qué esperas para iniciar?
                        </Typography>
                        <button className='terms-button'>
                            Lee terminos y condiciones
                        </button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
</Container>

    )
}

export default InfoHome;
