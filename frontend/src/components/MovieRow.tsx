import { useState, useRef, useEffect, memo } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Movie {
  _id: string;
  movie?: Movie;
  progress?: number;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isContinueWatching?: boolean;
}

const MovieRow = memo(({ title, movies = [], isContinueWatching = false }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkArrows = () => {
      if (rowRef.current) {
        const { scrollWidth, clientWidth } = rowRef.current;
        setShowRightArrow(scrollWidth > clientWidth);
      }
    };

    const timer = setTimeout(checkArrows, 150);
    window.addEventListener('resize', checkArrows);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkArrows);
    };
  }, [movies]);

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="my-4 md:my-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="relative group">
        {/* Left Arrow - Hidden on mobile, visible on hover for desktop */}
        <button
          onClick={() => scroll("left")}
          className={`hidden md:flex absolute top-0 bottom-0 left-0 z-20 w-12 items-center justify-center
            bg-black/40 hover:bg-black/60 transition-all duration-300
            ${showLeftArrow ? "opacity-0 lg:group-hover:opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-8 h-8 text-white" />
        </button>

        {/* Movie Cards Container - Touch swipe enabled */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-2 md:gap-4 overflow-x-auto overflow-y-hidden 
            scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8
            scroll-snap-x touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="scroll-snap-start flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
            >
              <MovieCard
                movie={movie.movie || movie}
                progress={movie.progress}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow - Hidden on mobile, visible on hover for desktop */}
        <button
          onClick={() => scroll("right")}
          className={`hidden md:flex absolute top-0 bottom-0 right-0 z-20 w-12 items-center justify-center
            bg-black/40 hover:bg-black/60 transition-all duration-300
            ${showRightArrow ? "opacity-0 lg:group-hover:opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
});

MovieRow.displayName = 'MovieRow';

export const SkeletonRow = () => (
  <div className="my-4 md:my-8">
    <div className="h-6 md:h-8 w-32 md:w-48 bg-gray-800 rounded mb-3 md:mb-4 mx-4 sm:mx-6 lg:mx-8 animate-pulse" />
    <div className="flex gap-2 md:gap-4 overflow-hidden px-4 sm:px-6 lg:px-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] aspect-[2/3] bg-gray-800 rounded animate-pulse"
        />
      ))}
    </div>
  </div>
);

export default MovieRow;