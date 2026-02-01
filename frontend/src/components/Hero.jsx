import { motion } from 'framer-motion';
import Button from './Button';
import { SkeletonHero } from './Loader';
import { Link } from 'react-router-dom';

const Hero = ({ movie }) => {
  if (!movie) {
    return <SkeletonHero />;
  }

  return (
    <div className="relative h-[56.25vw] min-h-[400px] max-h-[800px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={movie.backdrop_path || movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            {movie.title}
          </h1>
          <p className="mt-4 text-lg text-gray-300 line-clamp-3">
            {movie.overview || movie.description}
          </p>
          <div className="mt-8 flex space-x-4">
            <Link to={`/watch/${movie._id}`}>
                <Button>Play</Button>
            </Link>
            <Button variant="secondary">More Info</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;