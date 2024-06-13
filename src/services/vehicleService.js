import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const getVehicle = async (id) => {
    try {
        const response = await axios.get(`${urlApi}/vehicle/readVehicle/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

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

export const getVehicleByDriverId = async (driverId) => {
    try {
        const response = await axios.get(`${urlApi}/vehicle/readVehicle/${driverId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};