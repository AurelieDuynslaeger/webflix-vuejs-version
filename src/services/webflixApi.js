import axios from 'axios';

const API_URL = import.meta.env.VITE_WEBFLIX_API_BASE_URL;

export const signup = async (username, email, password) => {
    return await axios.post(`${API_URL}/signup`, { username, email, password });
};

export const login = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};
