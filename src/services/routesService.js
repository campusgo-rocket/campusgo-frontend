import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const getRoutes = async () => {
    try {
        const response = await axios.get(`${urlApi}/route/getAllRoutes`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

export const postRoute = async (id) => {
    try {
        const response = await axios.post(`${urlApi}/route/createRoute`, id, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};