import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';

const FeatureMovies = () => {
    return (
        <div className="relative text-white">
            <Movie />
            <PaginateIndicator />
        </div>
    );
};
export default FeatureMovies;
