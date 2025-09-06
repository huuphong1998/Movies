import ImageComponent from '@components/Image';
import { useModalContext } from '@context/ModalProvider';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Movie = ({ data, trailerVideoKey }) => {
    const { openPopup } = useModalContext();
    if (!data) return null;

    const { id, backdrop_path, title, release_date, overview } = data;

    return (
        <>
            <ImageComponent
                src={backdrop_path && `https://image.tmdb.org/t/p/original${backdrop_path}`}
                className="aspect-video w-full object-cover brightness-50"
                width={900}
                height={500}
            />
            <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
                <p className="mb-2 font-bold sm:text-[2vw]">{title}</p>
                <div>
                    <p className="text-[1.2vw]">{release_date}</p>
                </div>
                <div>
                    <div className="mt-4 hidden text-[1.2vw] sm:block">
                        <p className="mb-2 font-bold">Overview</p>
                        <p>{overview}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        onClick={() => {
                            openPopup(
                                <iframe
                                    title="Trailer"
                                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                                    className="aspect-video w-[50vw]"
                                />
                            );
                        }}
                        className="text-10 mr-2 cursor-pointer rounded bg-white px-4 py-2 text-black lg:text-lg"
                    >
                        <FontAwesomeIcon icon={faPlay} /> Trailer
                    </button>
                    <Link to={`/movie/${id}`}>
                        <button className="text-10 cursor-pointer rounded bg-white/35 px-4 py-2 lg:text-lg">
                            View Detail
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Movie;
