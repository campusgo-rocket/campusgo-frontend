import React from 'react';
import './InfoHomeComponent.css';
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
        <Container maxWidth="xl" className='container-home poppins-light'>
    <Grid container spacing={3} className='container-child-info info-cards-container' sx={{ height: '100%' }}>



        <Grid item xs={12}>
            <h1 className="info-heading">Viaja seguro, viaja tranquilo</h1>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card className='info-card' 
                    sx={{
                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 
                        borderRadius: '15px',}}>
                <CardContent>
                    <div className="info-icon" style={{ backgroundImage: `url(${sosIcon})` }} />
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ marginTop: '20%' }}>
                        Fácil acceso al botón de SOS para alertar a tus contactos de confianza y al 123.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card className="info-card"
            sx={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 
                borderRadius: '15px',}}>
                <CardContent>
                    <div className="info-icon" style={{ backgroundImage: `url(${universityIcon})` }} />
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ marginTop: '20%' }}>
                        Todos los usuarios deben verificar que son estudiantes antes de acceder a cualquier servicio.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card className="info-card"
            sx={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 
                borderRadius: '15px',}}>
                <CardContent >
                    <div className="info-icon" style={{ backgroundImage: `url(${locationIcon})` }} />
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ marginTop: '20%' }}>
                        Comparte tu ubicación en tiempo real para que tus seres queridos puedan seguir tu ruta.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
</Container>

    )
}

export default InfoHome;
