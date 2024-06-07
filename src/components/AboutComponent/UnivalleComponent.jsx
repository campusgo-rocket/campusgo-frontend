import React from 'react'
import './UnivalleComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import UnivalleLogo from '../../assets/images/Univalle.jpg'

function InfoComponent() {
    return (
        <Container maxWidth="xl" className='container-univalle poppins-light' sx={{height: '110vh'}}>
            <Grid container spacing={1} className='container-child-univalle'>
                <Grid item xs={12} className='logo-container'>
                    <img src={UnivalleLogo} alt="Univalle Logo" className='univalle-logo' />
                </Grid>
                <Grid item xs={12}>
                    <p className='univalle-info-text1'>Lo que nos distingue es nuestra dedicación a la comunidad estudiantil. Todos los conductores y pasajeros en nuestra plataforma son parte de la familia Univalle, lo que crea un sentido de solidaridad y confianza que va más allá de un simple viaje en automóvil.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='univalle-text'>Con CampusGo, no solo estás llegando a tu destino, ¡estás haciendo conexiones significativas en el camino!</p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default InfoComponent
