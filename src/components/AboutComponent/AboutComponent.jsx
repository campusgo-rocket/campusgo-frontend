import React from 'react'
import './AboutComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import imageAbout from './../../assets/images/About-Us-Chica.png'
import iconoAbout from './../../assets/images/icono-sobrenosotros.png'


function AboutComponent() {
    return (  
        <Container maxWidth="xl" className='container poppins-light' sx={{height: '82vh'}}>
            <Grid container spacing={1} className='container-child'>
                <Grid item xs={12} sm={8} md={8}>
                    <h1>Sobre nosotros</h1>
                    <p>CampusGo es una plataforma creada por y para la comunidad estudiantil de la Universidad del Valle.</p>
                    <img src={iconoAbout} className='iconoAbout' />
                </Grid>
                <Grid item xs={3} sm={4} md={4} display={{ xs: 'none', sm: 'none', md: 'block' }} hidden={{ xs: true, sm: true,  md: false }}>
                    <img src={imageAbout} className='imageAbout' />
                </Grid>
            </Grid>
        </Container>     
    )
}

export default AboutComponent