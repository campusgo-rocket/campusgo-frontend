import React from 'react'
import './InfoComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'


function InfoComponent() {
    return (  
        <Container maxWidth="xl" className='container-info poppins-light' sx={{height: '82vh'}}>
            <Grid container spacing={1} className='container-child-info'>
                    <h1>¡CUPOS!</h1>
                    <p>El sistema de cupos ha sido durante mucho tiempo la forma de conexión entre estudiantes con vehículos y aquellos que necesitan un medio de transporte. CampusGo toma esa idea y la lleva al siguiente nivel, proporcionando una plataforma centralizada y fácil de usar que facilita la conexión entre conductores y pasajeros.</p>
            </Grid>
        </Container>     
    )
}

export default InfoComponent