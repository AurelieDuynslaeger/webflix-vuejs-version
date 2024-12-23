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
    console.log('login - Données envoyées:', { email, password });
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log('login - Réponse reçue:', response.data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response);
        throw error;
    }
};

export const addMovieToFavorites = async (filmId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/user/favorites/${filmId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(filmId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
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
export const addTvShowToFavorites = async (tvShowId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/user/tvshowfavorites/${tvShowId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let showfavorites = JSON.parse(localStorage.getItem('showfavorites')) || [];
        showfavorites.push(tvShowId);
        localStorage.setItem('favorites', JSON.stringify(showfavorites));
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de l\'ajout du tv show aux favoris:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

export const getFavorites = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/favorites`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.setItem('favorites', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};
export const getTvFavorites = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/tvshowfavorites`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.setItem('showfavorites', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};

export const removeMovieFromFavorites = async (filmId) => {
    const response = await fetch(`${API_URL}/user/favorites/${filmId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to remove movie from favorites');
    }
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== filmId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return response.json();
};

export const removeTvShowFromFavorites = async (tvShowId) => {
    const response = await fetch(`${API_URL}/user/tvshowfavorites/${tvShowId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to remove tv show from favorites');
    }
    let showfavorites = JSON.parse(localStorage.getItem('showfavorites')) || [];
    showfavorites = showfavorites.filter(id => id !== tvShowId);
    localStorage.setItem('showfavorites', JSON.stringify(showfavorites));
    return response.json();
};

export const addMovieComment = async (filmId, comment) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/comments/${filmId}`, { comment }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(filmId);
        localStorage.setItem('comments', JSON.stringify(comments));
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de l\'ajout du commentaire:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

//edit comment
export const editMovieComment = async (commentId, updatedContent) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/comments/${commentId}`, { content: updatedContent }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de la modification du commentaire:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

//delete comment
export const deleteMovieComment = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de la suppression du commentaire:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

//get all comments for film or serie
export const getAllMovieComments = async (filmId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/comments/${filmId}/comments`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.comments;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de lé récupération des commentaires:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/user/current-user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de la récupération des infos user:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};

export const userUpdatedPassword = async (email, updatedPassword) => {
    console.log('userUpdatedPassword - Données envoyées:', { email, updatedPassword });
    try {
        const response = await axios.put(`${API_URL}/auth/reset-password`,
            { email, updatedPassword });
        console.log('userUpdatedPassword - Réponse reçue:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erreur lors de la modification du mot de passe:', error.response.data);
        } else {
            console.error('Erreur lors de la requête:', error.message);
        }
        throw error;
    }
};