import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getImageUrl, getMovieDetail, getMovieVideos } from "../services/tmdb";
import { PacmanLoader } from "react-spinners";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, loading, error] = useFetch(() => getMovieDetail(id), [id]);
    const [videos] = useFetch(() => getMovieVideos(id), [id]);

    if (error) {
        return (
            <div className="text-center text-red-500">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>No se pudo obtener la película</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PacmanLoader color="#ffec57" />
            </div>
        );
    }

    return (
        <article className="flex flex-col items-center justify-center max-w-4xl mx-auto p-4">
            <header className="relative w-full h-96 mb-8">
                <img 
                    src={getImageUrl(movie?.backdrop_path, "original")} 
                    alt={movie?.title} 
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <h1 className="text-4xl font-bold">{movie?.title}</h1>
                    {movie?.tagline && <p className="text-2xl mt-2 italic">{movie?.tagline}</p>}
                </div>
            </header>
            <section className="text-center p-4">
                <p className="text-lg text-gray-300">{movie?.overview}</p>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Géneros</h2>
                    <ul className="flex flex-wrap justify-center gap-2 mt-2">
                        {movie?.genres?.map((genre) => (
                            <li key={genre.id} className="bg-gray-800 px-4 py-2 rounded-lg">{genre.name}</li>
                        ))}
                    </ul>
                </div>
            </section>
            {videos?.results?.length > 0 && (
                <section className="mt-8 w-full">
                    <h2 className="text-2xl font-bold mb-4">Tráiler</h2>
                    <div className="flex justify-center">
                        <iframe 
                            className="w-full max-w-2xl aspect-video rounded-lg"
                            src={`https://www.youtube.com/embed/${videos.results[0].key}`} 
                            title={movie?.title} 
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            )}
        </article>
    );
};

export default MovieDetail;
