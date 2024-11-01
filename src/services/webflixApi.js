import axios from 'axios';

const API_URL = import.meta.env.VITE_WEBFLIX_API_BASE_URL;

export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
        return response;
    } catch (error) {
        console.error('Erreur lors de l’inscription:', error.response);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        console.log('Données envoyées pour login:', { email, password });
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response);
        throw error;
    }
};

export const addMovieToFavorites = async (filmId) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token utilisé pour l\'authentification:', token);
        const response = await axios.post(`${API_URL}/user/favorites/${filmId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de l\'ajout du film aux favoris:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};