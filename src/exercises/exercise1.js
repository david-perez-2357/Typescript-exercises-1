import {Movie} from "../classes/Movie.js";

const allMovies = [
    new Movie("El señor de los anillos", 2001, "Peter Jackson", 9 , "Fantasía"),
    new Movie("Star Wars", 2005, "Jorge Lucas", 8 , "Acción"),
    new Movie("Harry Potter", 2003, "J.K. Rowling", 7 , "Fantasía"),
    new Movie("El padrino", 1972, "Francis Ford Coppola", 10 , "Drama"),
    new Movie("El resplandor", 1980, "Stanley Kubrick", 8 , "Terror"),
    new Movie("El exorcista", 1973, "William Friedkin", 7 , "Terror"),
    new Movie("El club de la lucha", 1999, "David Fincher", 9 , "Drama"),
    new Movie("El silencio de los corderos", 1991, "Jonathan Demme", 8 , "Terror"),
    new Movie("El sexto sentido", 1999, "M. Night Shyamalan", 7 , "Terror")
];

const genres = [...new Set(allMovies.map(movie => movie.genre))];

let ratingAvg= allMovies.reduce((acc, movie) => acc + movie.rating, 0) / allMovies.length;
ratingAvg = ratingAvg.toFixed(2);

const mostRatedMovies = allMovies.sort((a, b) => b.rating - a.rating).slice(0, 3);
let movies = allMovies;

function createMovieCard(movie, order) {
    return `
    <div data-aos="zoom-in" data-aos-delay=${order * 200} class="rounded-xl relative w-full bg-blue-100 p-4">
        <h2 class="text-xl font-bold text-gray-800">${movie.title}</h2>
        <p class="text-gray-700">${movie.director} - ${movie.year}</p>
        <span class="text-white -right-1 absolute rounded-full bg-blue-600 -top-1 p-2 text-sm py-1">
            ${movie.genre}
        </span>
    
        <div class="flex gap-2 mt-4">
            <span class="text-gray-800">Valoración:</span>
            <span class="text-blue-700">${movie.rating}</span>
        </div>
    </div>`
}

function movieFilterChange(genre) {
    if (!genre) {
        movies = allMovies;
    }else {
        movies = allMovies.filter(movie => movie.genre === genre);
    }

    document.getElementById("moviesContainer").innerHTML = movies.map((movie, index) => createMovieCard(movie, index)).join("");
}

document.getElementById("genreSelect").addEventListener("change", (e) => {
    movieFilterChange(e.target.value);
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded");
    document.getElementById("ratingAvg").innerHTML = "Valoración media: " + ratingAvg;
    console.log(document.getElementById("ratingAvg").innerHTML);

    for (let i = 0; i < genres.length; i++) {
        document.getElementById("genreSelect").append(new Option(genres[i], genres[i]));
    }

    document.getElementById("mostRatedMoviesContainer").innerHTML = mostRatedMovies.map((movie, index) => createMovieCard(movie, index)).join("");
    movieFilterChange("");
});