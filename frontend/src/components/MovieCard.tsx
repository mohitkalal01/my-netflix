import { useNavigate } from "react-router-dom";
import { PlayIcon, PlusIcon, CheckIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import { MouseEvent, memo, useState } from "react";

interface Movie {
  _id: string;
  thumbnail?: string;
  posterUrl?: string;
  title: string;
}

interface Progress {
  currentTime: number;
  duration: number;
}

interface MovieCardProps {
  movie: Movie;
  progress?: Progress;
}

const MovieCard = memo(({ movie, progress }: MovieCardProps) => {
  const navigate = useNavigate();
  const { myList, addToMyListContext, removeFromMyListContext } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isMovieInList = myList.some((item) => item._id === movie._id);
  const posterImage = movie.thumbnail || movie.posterUrl || '';

  const progressPercentage = progress
    ? (progress.currentTime / progress.duration) * 100
    : 0;

  const handleCardClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handlePlayClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/watch/${movie._id}`, { state: { resumeTime: progress?.currentTime } });
  };

  const handleMyListToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (isMovieInList) {
      removeFromMyListContext(movie._id);
    } else {
      addToMyListContext(movie);
    }
  };

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("Like button clicked");
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative block w-full aspect-[2/3] rounded-md overflow-hidden 
        transition-transform duration-300 ease-in-out z-10 
        md:hover:scale-105 md:hover:z-20 cursor-pointer
        active:scale-95 touch-manipulation"
    >
      {/* Placeholder skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={posterImage}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Progress bar for continue watching */}
      {progress && progress.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-700">
          <div
            className="h-full bg-brand-red"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* Mobile: Title always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent md:hidden">
        <h3 className="text-white text-xs font-medium truncate">{movie.title}</h3>
      </div>

      {/* Desktop: Hover Overlay */}
      <div
        className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
          opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
          <h3 className="text-white text-sm lg:text-base font-bold truncate">{movie.title}</h3>
          <div className="flex items-center space-x-2 mt-2 lg:mt-3">
            {/* Play Button */}
            <button
              onClick={handlePlayClick}
              className="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center rounded-full bg-white text-black pointer-events-auto hover:bg-gray-200 transition-colors"
              aria-label="Play"
            >
              <PlayIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>

            {/* Add to List Button */}
            <button
              onClick={handleMyListToggle}
              className="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center rounded-full border-2 border-gray-400 text-white pointer-events-auto hover:border-white transition-colors"
              aria-label={isMovieInList ? "Remove from list" : "Add to list"}
            >
              {isMovieInList ? <CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" /> : <PlusIcon className="h-4 w-4 lg:h-5 lg:w-5" />}
            </button>

            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center rounded-full border-2 border-gray-400 text-white pointer-events-auto hover:border-white transition-colors"
              aria-label="Like"
            >
              <HandThumbUpIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;