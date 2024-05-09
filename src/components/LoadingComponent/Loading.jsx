import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingComponent() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centrar horizontalmente
                alignItems: 'center', // Centrar verticalmente
                height: '80vh', // Establecer altura al 100% del viewport
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export { LoadingComponent };