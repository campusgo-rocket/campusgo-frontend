import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const postVehicle = async (idDriver) => {
    try {
        const response = await axios.post(`${urlApi}/vehicle/createVehicle`, idDriver, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

