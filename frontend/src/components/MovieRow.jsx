import { useState, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MovieRow = ({ title, movies = [] }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10); // Show arrow if scrolled more than 10px
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // Hide arrow if near the end
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      // Scroll by 80% of the container width for a smoother, partial scroll
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Check scroll state on initial mount and on movies change
  useEffect(() => {
    const checkArrows = () => {
      if (rowRef.current) {
        const { scrollWidth, clientWidth } = rowRef.current;
        setShowRightArrow(scrollWidth > clientWidth);
      }
    };
    
    // A small timeout allows the layout to stabilize before checking
    const timer = setTimeout(checkArrows, 150);
    window.addEventListener('resize', checkArrows);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkArrows);
    };
  }, [movies]);


  if (!movies || movies.length === 0) {
    return null; // Don't render the row if there are no movies
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold text-white mb-3 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="relative group">
        {/* Left Arrow */}
        <button
            onClick={() => scroll("left")}
            className={`absolute top-0 bottom-0 left-0 z-20 w-12 bg-black/40 hover:bg-black/60 transition-all duration-300
            ${showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"}
            lg:opacity-0 group-hover:lg:opacity-100`}
        >
            <ChevronLeftIcon className="w-8 h-8 text-white mx-auto" />
        </button>

        {/* Movie Cards Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie.movie || movie}
              progress={movie.progress}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
            onClick={() => scroll("right")}
            className={`absolute top-0 bottom-0 right-0 z-20 w-12 bg-black/40 hover:bg-black/60 transition-all duration-300
            ${showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"}
            lg:opacity-0 group-hover:lg:opacity-100`}
        >
            <ChevronRightIcon className="w-8 h-8 text-white mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;