import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import LocationPicker from './LocationPicker'; // Importa tu componente LocationPicker

const LocationPickerModal = ({ open, onClose, onLocationSelect }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Selecciona tu ubicación
                </Typography>
                <LocationPicker onLocationSelect={onLocationSelect} />
                <Button onClick={onClose}>Cerrar</Button>
            </Box>
        </Modal>
    );
};

export default LocationPickerModal;
