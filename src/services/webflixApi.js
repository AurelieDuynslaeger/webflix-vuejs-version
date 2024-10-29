import axios from 'axios';

const API_URL = import.meta.env.VITE_WEBFLIX_API_BASE_URL;

export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { username, email, password });
        return response;
    } catch (error) {
        console.error('Erreur lors de l’inscription:', error.response);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        console.log('Données envoyées pour login:', { email, password });
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response);
        throw error;
    }
};
