import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const getReservations = async () => {
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