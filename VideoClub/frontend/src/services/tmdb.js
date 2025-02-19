const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

//--------------------------Objeto que me permite decidir el tamaño de las imagenes-------------------------------------------------

export const IMAGES_SIZE = {
    POSTER: "w500",
    BACKDROP: "original",
}

//------------------------------Funciones que voy a crear para la API---------------------------------------------------------------

// Funcion para obtener la url de una imagen
export const getImageUrl = (size = IMAGES_SIZE.POSTER, path) =>{
    if(!path){
        return "/placeholder-movie.jpg";
    }
    return `${VITE_BASE_IMAGE_URL}/${size}/${path}`;
}

export const fetchFromAPI = async (endpoint, options = {} ) => {
    try{
        const cleanEndpoint = endpoint.replace(/^\/+/, "");
        
        const response = await fetch(`${VITE_BASE_URL}/${cleanEndpoint}?api_key=${VITE_API_TOKEN}&language=es-ES&${new URLSearchParams(options)}`);        if(!response.ok){
            throw new Error("Error en la peticion");
        }
        return await response.json();
    } catch(error){
        console.error(error);
    }
}

export const getPopularMovies = async (page = 1) => {
    return fetchFromAPI("/movie/popular", {page});
}

export const getMovieDetail = async (id) => {
    return fetchFromAPI(`/movie/${id}`);
}

export const searchMovies = async (query, page=1) => {
    return fetchFromAPI("/search/movie", {query, page});
}

export const getMovieVideos = async (id) => {
    return fetchFromAPI(`/movie/${id}/videos`);
}

export const getMovieReviews = async (id) => {
    return fetchFromAPI(`/movie/${id}/reviews`);
}