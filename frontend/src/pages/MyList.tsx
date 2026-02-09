import React from 'react';
import MainLayout from '../components/MainLayout';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/Loader';

const MyList = () => {
  const { myList, loading } = useAuth();

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">My List</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : myList.length === 0 ? (
          <p className="text-gray-400">Your list is empty. Add shows and movies to your list to see them here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyList;
