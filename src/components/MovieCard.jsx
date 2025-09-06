import { Link } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';
import ImageComponent from './image';

const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
    return (
        <Link to={mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`} className="rounded-lg border border-slate-800">
            <div className="relative">
                {mediaType === 'tv' && (
                    <p className="absolute top-1 right-1 rounded bg-black p-1 text-sm font-bold text-white shadow-md">
                        TV Show
                    </p>
                )}
                <ImageComponent
                    className="aspect-[2/3] w-full rounded-lg object-cover"
                    src={poster && `https://image.tmdb.org/t/p/w500${poster}`}
                    width={210}
                    height={300}
                />
                <div className="relative -top-[1.5vw] px-4">
                    <CircularProgressBar
                        percent={Math.round(point * 10) || 0}
                        strokeColor={point >= 7 ? 'green' : point >= 5 ? 'orange' : 'red'}
                    />
                    <p className="mt-2 font-bold">{title}</p>
                    <p className="text-slate-300">{releaseDate}</p>
                </div>
            </div>
        </Link>
    );
};
export default MovieCard;
