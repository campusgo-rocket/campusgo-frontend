import React from 'react';
import './MissionComponent.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import seguroIcon from '../../assets/images/seguro.png';
import ecologicoIcon from '../../assets/images/ecologico.png';
import eficienteIcon from '../../assets/images/eficiente.png';

function InfoHome() {
    return (  
        <Container maxWidth="xl" className='container-mission poppins-light'>
            <Grid container spacing={3} className='container-child-info info-cards-container' sx={{ height: '100%' }}>
                <Grid item xs={12}>
                    <h1 className="info-heading-mission">Nuestra misión es simple, brindar una alternativa...</h1>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className='mission-card' sx={{backgroundColor: 'transparent', boxShadow: 'none', border: 'none'}}>
                        <CardContent className='card-content'>
                            <div className="info-Mission" style={{ backgroundImage: `url(${seguroIcon})` }} />
                            <Typography variant="h5" color="white" component="p" className='typography'>
                                Segura
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className="mission-card" sx={{backgroundColor: 'transparent', boxShadow: 'none', border: 'none'}}>
                        <CardContent className='card-content'>
                            <div className="info-Mission" style={{ backgroundImage: `url(${ecologicoIcon})` }} />
                            <Typography variant="h5" color="white" component="p" className='typography'>
                                Ecológica
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className="mission-card" sx={{backgroundColor: 'transparent', boxShadow: 'none', border: 'none'}}>
                        <CardContent className='card-content'>
                            <div className="info-Mission" style={{ backgroundImage: `url(${eficienteIcon})` }} />
                            <Typography variant="h5" color="white" component="p" className='typography'>
                                Eficiente
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <h1 className="mission">¿Tienes un automóvil y quieres ayudar a tus compañeros mientras ganas un ingreso extra? ¿O tal vez necesitas un viaje rápido y no quieres depender de servicios de transporte convencionales?</h1>
                </Grid>
                <Grid item xs={12}>
                    <h1 className="mission-here">CampusGo está aquí para ti.</h1>
                </Grid>
            </Grid>
        </Container>
    )
}

export default InfoHome;
