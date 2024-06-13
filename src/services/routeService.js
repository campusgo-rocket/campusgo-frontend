import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

export const postRoute = async (routeData) => {
    try {
        const response = await axios.post(`${urlApi}/route/createRoute`, routeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

export const getAllRoutes = async () => {
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


export const getRoute = async (idRoute) => {
    try {
        const response = await axios.get(`${urlApi}/route/readRoute/${idRoute}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

export const updateRoute = async (idRoute, routeData) => {
    try {
        const response = await axios.put(`${urlApi}/route/updateRoute/${idRoute}`, routeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};

export const deleteRoute = async (idRoute) => {
    try {
        const response = await axios.delete(`${urlApi}/route/deleteRoute/${idRoute}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error de respuesta del servidor: ${error.response.data}`);
    }
};