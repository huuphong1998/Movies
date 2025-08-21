import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';
import { useEffect, useState } from 'react';

const FeatureMovies = () => {
    const [movies, setMovies] = useState([]);
    const [activeMovieId, setActiveMovieId] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDRiMDJjYzYzYzY2OTVhZGE5NGpmMGYzZjIyZjM3MSIsInN1YiI6IjY3NjA4ODNjMzhlY2QzYTZiNzZiYzBiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8B90BWYv6IGJLKt713PDR0Wn309IgwEahjo1uOEUWSg',
            },
        })
            .then(res => res.json())
            .then(data => {
                const popularMovies = data.results.slice(0, 4);
                setMovies(popularMovies);
                setActiveMovieId(popularMovies[0].id);
            });
    }, []);
    console.log(movies);

    return (
        <div className="relative text-white">
            {movies
                .filter(movie => movie.id === activeMovieId)
                .map(movie => (
                    <Movie key={movie.id} data={movie} />
                ))}
            <PaginateIndicator movies={movies} activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId} />
        </div>
    );
};

export default FeatureMovies;
