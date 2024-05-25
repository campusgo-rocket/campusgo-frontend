import React from 'react'
import './HomeComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import imageLanding from './../../assets/images/image-landing.png'


function HomeComponent() {
    return (  
        <Container maxWidth="xl" className='container poppins-light' sx={{height: '82vh'}}>
            <Grid container spacing={1} className='container-child' sx={{paddingRight: '0%'}}>
                <Grid item xs={12} sm={8} md={8}>
                    <h1>Llegar a la U <br/>nunca fue tan fácil</h1>
                    <p>Viaja cómodo, conduce seguro</p>
                    <h2 className='start-now'>¡Empieza ahora!</h2>
                    <KeyboardDoubleArrowDownIcon className='icon' sx={{ fontSize: 60 }} />
                </Grid>
                <Grid item xs={3} sm={4} md={4} display={{ xs: 'none', sm: 'none', md: 'block' }} hidden={{ xs: true, sm: true,  md: false }} >
                    <img src={imageLanding} className='imageLanding' />
                </Grid>
            </Grid>
        </Container>     
    )
}

export default HomeComponent