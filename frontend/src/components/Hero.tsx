import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { SkeletonHero } from './Loader';

interface Movie {
  _id: string;
  backdrop_path?: string;
  thumbnail?: string;
  posterUrl?: string;
  title: string;
  overview?: string;
  description?: string;
}

interface HeroProps {
  movie: Movie | null;
}

const Hero = ({ movie }: HeroProps) => {
  if (!movie) {
    return <SkeletonHero />;
  }

  const backgroundImage = movie.backdrop_path || movie.thumbnail || movie.posterUrl;
  const description = movie.overview || movie.description || '';

  return (
    <div className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] max-h-[900px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-16 md:pb-20 lg:pb-24">
        <div className="container-mobile max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg lg:max-w-xl"
          >
            {/* Title - Responsive sizing */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
              {movie.title}
            </h1>

            {/* Description - Hidden on very small screens */}
            {description && (
              <p className="hidden sm:block mt-3 md:mt-4 text-sm md:text-base lg:text-lg text-gray-300 line-clamp-2 md:line-clamp-3">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 md:mt-6 lg:mt-8 flex flex-row gap-2 sm:gap-3 md:gap-4">
              <Link
                to={`/watch/${movie._id}`}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-black font-semibold 
                  px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded 
                  text-sm sm:text-base
                  hover:bg-gray-200 transition-colors touch-target"
              >
                <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Play</span>
              </Link>

              <Link
                to={`/movies/${movie._id}`}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-500/70 text-white font-semibold 
                  px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded 
                  text-sm sm:text-base
                  hover:bg-gray-500/90 transition-colors touch-target"
              >
                <InformationCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden xs:inline">More Info</span>
                <span className="xs:hidden">Info</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;