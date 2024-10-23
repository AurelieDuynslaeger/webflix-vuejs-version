const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export const getPopularMovies = async (totalPages = 4) => {
    const allMovies = [];
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();
        allMovies.push(...data.results);
    }
    return allMovies;
};


export const getMoviesByGenre = async (genreId, totalPages = 4) => {
    const allMovies = [];
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=fr-FR&page=${page}`);
        const data = await response.json();
        allMovies.push(...data.results);
    }
    return allMovies;
};


export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
    return await response.json();
};


export const getPopularActors = async (totalPages = 4) => {
    const allActors = [];
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();
        allActors.push(...data.results);
    }
    return allActors;
};

export const fetchMovieDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
};

export const fetchMovieVideos = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
    }
    const data = await response.json();
    return data.results;
};


export const fetchActorDetail = async (actorId) => {
    const response = await fetch(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
    }
    const data = await response.json();
    return data;
};

export const fetchActorMoviesCredits = async (actorId) => {
    const response = await fetch(`${BASE_URL}/person/${actorId}/movie_credits?language=fr-FR&api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
    }
    const data = await response.json();
    return data.cast;
};
