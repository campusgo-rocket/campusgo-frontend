import React from 'react'
import './TermsComponent.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TYC from '../../assets/images/TYC.png'

function InfoComponent() {
    return (
        <Container maxWidth="xl" className='container-TYC poppins-light' sx={{height: '180vh'}}>
            <Grid container spacing={1} className='container-child-TYC'>
                <Grid item xs={12} className='TYC-container'>
                    <img src={TYC} alt="TYC" className='TYC-logo' />
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-text'>Términos y Condiciones:</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-info-text1'>Gracias por utilizar nuestra aplicación para la solicitud de cupos en la Universidad del Valle. Es importante destacar que para participar en nuestra plataforma, es necesario ser estudiante activo de la Universidad del Valle. Al registrarte en nuestra aplicación, aceptas que eres un estudiante actualmente matriculado en la Universidad del Valle.

Es importante tener en cuenta que la aplicación actúa únicamente como un medio para conectar a conductores y pasajeros universitarios, facilitando la coordinación de viajes compartidos. No nos responsabilizamos por las acciones de los usuarios dentro o fuera de la plataforma. Somos un facilitador y no proveemos ningún servicio de transporte.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-text'>Condiciones de Uso:</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-info-text1'>Al utilizar nuestra aplicación, aceptas que cualquier ruta publicada debe tener como destino u origen la Universidad del Valle. No se permiten cobros diferentes a los estandarizados por la aplicación, los cuales se basan en tarifas preestablecidas. Los estudiantes tienen total libertad para elegir las rutas y los compañeros de viaje que consideren más convenientes.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-text'>Política de Privacidad:</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-info-text1'>En nuestra aplicación, respetamos y protegemos tu privacidad. La información proporcionada durante el registro y el uso de la plataforma será tratada de manera confidencial y solo se utilizará con el propósito de facilitar la coordinación de viajes compartidos entre estudiantes de la Universidad del Valle. No compartiremos tus datos personales con terceros sin tu consentimiento explícito, excepto cuando sea requerido por ley.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-text'>Información Legal:</p>
                </Grid>
                <Grid item xs={12}>
                    <p className='TYC-info-text1'>Nos reservamos todos los derechos relacionados con el funcionamiento y la propiedad intelectual de la aplicación. Esto incluye, entre otros, los derechos de autor y cualquier otro derecho de propiedad intelectual asociado con la aplicación y su contenido. Cualquier reproducción, distribución o modificación no autorizada de la aplicación está estrictamente prohibida y puede dar lugar a acciones legales.</p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default InfoComponent
