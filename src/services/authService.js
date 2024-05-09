import axios from 'axios';

export const postUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error posting user: ', error);
        throw error;
    }
};