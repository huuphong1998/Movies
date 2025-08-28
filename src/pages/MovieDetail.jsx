import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@components/Loading';
import Banner from '@components/MediaDetail/Banner';
import ActorList from '@components/MediaDetail/ActorList';
import RelatedMediaList from '@components/MediaDetail/RelatedMediaList';
import MovieInformation from '@components/MediaDetail/MovieInformation';

const MovieDetail = () => {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [isRelatedMovieListLoading, setIsRelatedMovieListLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE3ODRiMDJjYzYzY2VmYWY1MzQ5YTVhZGE5NGQzZiIsIm5iZiI6MTc1NTU3ODQ1Mi43OTYsInN1YiI6IjY4YTQwMDU0YzUwMGJmYTM3MTE3ZDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8B90BWYv6IGJLKt713PDR0Wn3Q9IgwEahjo1uQEUWSg',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMovieInfo(data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // setIsRelatedMovieListLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE3ODRiMDJjYzYzY2VmYWY1MzQ5YTVhZGE5NGQzZiIsIm5iZiI6MTc1NTU3ODQ1Mi43OTYsInN1YiI6IjY4YTQwMDU0YzUwMGJmYTM3MTE3ZDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8B90BWYv6IGJLKt713PDR0Wn3Q9IgwEahjo1uQEUWSg',
            },
        })
            .then(res => res.json())
            .then(data => {
                const currentRelatedMovies = (data.results || []).slice(0, 12);
                setRelatedMovies(currentRelatedMovies);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                // setIsRelatedMovieListLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Banner mediaInfo={movieInfo} />
            <div className="bg-black text-[1.2vw] text-white">
                <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
                    <div className="flex-[2]">
                        <ActorList actors={movieInfo.credits?.cast || []} />
                        <RelatedMediaList mediaList={relatedMovies} />
                    </div>
                    <div className="flex-1">
                        <MovieInformation movieInfo={movieInfo} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
