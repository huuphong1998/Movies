import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';
import { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';

const FeatureMovies = () => {
    const [activeMovieId, setActiveMovieId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    const { data: popularMoviesResponse } = useFetch({
        url: '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    });

    const { data: videoResponse } = useFetch(
        {
            url: `/movie/${activeMovieId}/videos`,
        },
        { enabled: !!activeMovieId }
    );

    const movies = (popularMoviesResponse.results || []).slice(0, 4);

    useEffect(() => {
        if (movies[0]?.id) {
            setActiveMovieId(movies[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(movies)]);

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
                    <Movie
                        key={movie.id}
                        data={movie}
                        trailerVideoKey={
                            (videoResponse?.results || []).find(
                                video => video.type === 'Trailer' && video.site === 'YouTube'
                            )?.key
                        }
                    />
                ))}
            <PaginateIndicator movies={movies} activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId} />
        </div>
    );
};

export default FeatureMovies;
