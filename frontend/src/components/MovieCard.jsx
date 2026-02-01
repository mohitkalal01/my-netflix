import { Link } from "react-router-dom";
import { PlayIcon, PlusIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

const MovieCard = ({ movie, progress }) => {
  const progressPercentage = progress
    ? (progress.currentTime / progress.duration) * 100
    : 0;

  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Here you would typically dispatch an action, e.g., to add to a list.
    // For now, it just prevents the link from navigating.
    console.log("Button clicked, navigation prevented.");
  };

  return (
    <Link
      to={`/watch/${movie._id}`}
      state={{ resumeTime: progress?.currentTime }}
      className="group relative block w-40 md:w-48 lg:w-56 flex-shrink-0 aspect-[2/3] rounded-md overflow-hidden transition-transform duration-300 ease-in-out z-10 hover:scale-105 hover:z-20"
    >
      {/* --- BASE CARD CONTENT (Always visible) --- */}
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {progress && progress.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-700">
          <div
            className="h-full bg-red-600"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* --- HOVER OVERLAY (Desktop only, click-through) --- */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-base font-bold truncate">{movie.title}</h3>
          <div className="flex items-center space-x-2 mt-3">
            {/* Play Button */}
            <Link 
              to={`/watch/${movie._id}`} 
              onClick={handleButtonClick} 
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white text-black pointer-events-auto hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="h-5 w-5" />
            </Link>
            
            {/* Add to List Button */}
            <button
              onClick={handleButtonClick}
              className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-gray-400 text-white pointer-events-auto hover:border-white transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
            </button>

            {/* Like Button */}
            <button
              onClick={handleButtonClick}
              className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-gray-400 text-white pointer-events-auto hover:border-white transition-colors"
            >
              <HandThumbUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;