import { ExerciseContainer } from '../components/ExerciseContainer';
import {Movie} from "../classes/Movie.js";
import {MovieCard} from "../components/MovieCard.jsx";
import {useState} from "react";

export const Exercise1 = () => {
    const allMovies = [
        new Movie("El señor de los anillos", 2001, "Peter Jackson", 9, "Fantasía"),
        new Movie("Star Wars", 2005, "Jorge Lucas", 8, "Acción"),
        new Movie("Harry Potter", 2003, "J.K. Rowling", 7, "Fantasía"),
        new Movie("El padrino", 1972, "Francis Ford Coppola", 10, "Drama"),
        new Movie("El resplandor", 1980, "Stanley Kubrick", 8, "Terror"),
        new Movie("El exorcista", 1973, "William Friedkin", 7, "Terror"),
        new Movie("El club de la lucha", 1999, "David Fincher", 9, "Drama"),
        new Movie("El silencio de los corderos", 1991, "Jonathan Demme", 8, "Terror"),
        new Movie("El sexto sentido", 1999, "M. Night Shyamalan", 7, "Terror")
    ];

    const genres = [...new Set(allMovies.map(movie => movie.genre))];
    const ratingAvg = (allMovies.reduce((acc, movie) => acc + movie.rating, 0) / allMovies.length).toFixed(2);
    const mostRatedMovies = [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 3);

    const [movies, setMovies] = useState(allMovies);
    const [selectedGenre, setSelectedGenre] = useState("");

    function movieFilterChange(event) {
        const genre = event.target.value;
        setSelectedGenre(genre);
        console.log(genre);
        if (!genre) {
            setMovies(allMovies);
        }else {
            setMovies(allMovies.filter(movie => movie.genre === genre));
        }
    }

    return (
        <ExerciseContainer exerciseNumber="1">
            <h1 className="text-2xl text-gray-800 font-bold">Películas</h1>
            <p className="m-0 text-gray-600" id="ratingAvg">Valoración media: {ratingAvg}</p>

            <div className="mt-5">
                <label>Top 3 peliculas</label>
                <div className="grid grid-cols-3 gap-4 mt-4" id="mostRatedMoviesContainer">
                    {mostRatedMovies.map((movie, index) => <MovieCard key={`most-rated-${index}`} movie={movie} order={index} />)}
                </div>
            </div>

            <div className="mt-9">
                <label className="text-muted" htmlFor="genreSelect">Buscar por género</label>
                <select className="w-full p-2 rounded-md bg-gray-200 pe-5 focus:outline-none" id="genreSelect" value={selectedGenre} onChange={e => movieFilterChange(e)}>
                    <option value="">Selecciona un género</option>
                    {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4" id="moviesContainer">
                {movies.map((movie, index) => <MovieCard key={`movie-${index}`} movie={movie} order={index} />)}
            </div>
        </ExerciseContainer>
    );
}