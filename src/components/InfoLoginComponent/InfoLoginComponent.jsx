import React from 'react'
import './InfoLoginComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CardInfoComponent from './components/CardInfoLoginComponent/CardInfoComponent'
import { useNavigate } from 'react-router-dom'
import { useUser  } from '../../contexts/userContext'


const itemsDriver = {
    title: 'Soy conductor',
    subtitle: 'Genera ingresos extras sin desviarte de tu camino',
    listItems: ['Elige tu propia ruta', 'Programa tus rutas con anticipación','Conoce la calificación de tus pasajeros']
}

const itemsStudent = {
    title: 'Soy pasajero',
    subtitle: 'Viaja a la universidad cómodo, seguro y barato',
    listItems: ['Precios accesibles', 'Conoce la calificación de los conductores','Elige la ruta que más te convenga']
}


function InfoLoginComponent() {

  const navigate = useNavigate();

  const { setUserType } = useUser();

  const handleNavidateDriver = () => {
    setUserType('driver');
    navigate('/signup/driver');
  }

  const handleNavidatePassenger = () => {
    setUserType('passenger');
    navigate('/signup/passenger');
  }

  return (
    <Container maxWidth="xl" className='container-info-login poppins-light' sx={{height: '100vh'}}>
        <Grid container spacing={1} className='container-child'>
            <Grid item xs={12} textAlign={'center'}>
                <h2>Elige la opción que más se adapte a ti</h2>
            </Grid>
            <Grid item xs={12} md={6}>         
                <CardInfoComponent userObject={itemsDriver} handleNavidate={handleNavidateDriver}/>
            </Grid>
            <Grid item xs={12} md={6} >
                <CardInfoComponent userObject={itemsStudent} handleNavidate={handleNavidatePassenger}/>
            </Grid>
        </Grid>
    </Container>
  )
}

export default InfoLoginComponent