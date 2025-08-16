import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Movie = () => {
    return (
        <>
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/VN-vi-20250721-TRIFECTA-perspective_5409932f-3102-4302-a97a-edec29cf8909_large.jpg"
                className="aspect-video object-cover brightness-50"
            />
            <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
                <p className="mb-2 font-bold sm:text-[2vw]">Inside Out 2</p>
                <div>
                    <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">PG13</p>
                    <p className="text-[1.2vw]">2025-08-08</p>
                </div>
                <div>
                    <div className="mt-4 hidden text-[1.2vw] sm:block">
                        <p className="mb-2 font-bold">Overview</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur voluptatum
                            quibusdam asperiores eos consequuntur? Perferendis dolor cupiditate ad distinctio, sint
                            inventore ullam, labore tempore dolore error nisi delectus quis?
                        </p>
                    </div>
                    <div className="mt-4">
                        <button className="text-10 mr-2 rounded bg-white px-4 py-2 text-black lg:text-lg">
                            <FontAwesomeIcon icon={faPlay} /> Trailer
                        </button>
                        <button className="text-10 rounded bg-white/35 px-4 py-2 lg:text-lg">View Detail</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Movie;
