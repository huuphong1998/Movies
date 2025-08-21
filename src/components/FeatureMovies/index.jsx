import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';
import { useEffect, useState } from 'react';

const FeatureMovies = () => {
    const [movies, setMovies] = useState([]);
    const [activeMovieId, setActiveMovieId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE3ODRiMDJjYzYzY2VmYWY1MzQ5YTVhZGE5NGQzZiIsIm5iZiI6MTc1NTU3ODQ1Mi43OTYsInN1YiI6IjY4YTQwMDU0YzUwMGJmYTM3MTE3ZDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8B90BWYv6IGJLKt713PDR0Wn3Q9IgwEahjo1uQEUWSg',
            },
        })
            .then(res => res.json())
            .then(data => {
                const popularMovies = data.results.slice(0, 4);
                setMovies(popularMovies);
                setActiveMovieId(popularMovies[0].id);
            });
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (movies.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setActiveMovieId(prevId => {
                const currentIndex = movies.findIndex(movie => movie.id === prevId);
                const nextIndex = (currentIndex + 1) % movies.length;
                return movies[nextIndex].id;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [movies, isPaused]);
    return (
        <div
            className="relative text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
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
