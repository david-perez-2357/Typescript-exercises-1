
export const MovieCard = ({ movie , order }) => {
    return (
        <div data-aos="zoom-in" data-aos-delay={order * 200} className="rounded-xl relative w-full bg-blue-100 p-4">
            <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
            <p className="text-gray-700">{movie.director} - {movie.year}</p>
            <span className="text-white -right-1 absolute rounded-full bg-blue-600 -top-1 p-2 text-sm py-1">
                {movie.genre}
            </span>

            <div className="flex gap-2 mt-4">
                <span className="text-gray-800">Valoración:</span>
                <span className="text-blue-700">{movie.rating}</span>
            </div>
        </div>
    )
}