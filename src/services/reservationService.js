// src/services/reservationService.js
import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(`${urlApi}/reservation/createReservation`, reservationData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

export const getAllReservations = async () => {
    try {
        const response = await axios.get(`${urlApi}/reservation/getAllReservations`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};