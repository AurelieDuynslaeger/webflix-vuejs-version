const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async (totalPages = 4) => {
    const allMovies = [];
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();

        // Filtrer les films pour inclure uniquement ceux dont l'origine est US ou FR, avec un 'overview' non vide et qui ne sont pas pour adultes
        const filteredMovies = data.results.filter(movie =>
            (movie.original_language === "en" || movie.original_language === "fr") &&
            movie.overview && movie.overview.trim() !== "" &&
            !movie.adult
        );

        allMovies.push(...filteredMovies);
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

export const fetchMovieSimilar = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR&page=1`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data.results;
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


export const getPopularTvShows = async (totalPages = 4) => {
    const allTvShows = [];
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();

        // Filtrer les séries pour inclure uniquement celles dont l'origine est US ou FR et avec un 'overview' non vide
        const filteredTvShows = data.results.filter(tvShow =>
            (tvShow.origin_country.includes("US") || tvShow.origin_country.includes("FR")) &&
            tvShow.overview && tvShow.overview.trim() !== ""
        );

        allTvShows.push(...filteredTvShows);
    }
    return allTvShows;
};


export const fetchTvShowDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Failed to fetch tv show details');
    }
    return response.json();
};

