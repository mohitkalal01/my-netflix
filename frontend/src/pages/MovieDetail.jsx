import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

// This is a placeholder component.
// In a real application, you would fetch movie details based on the ID from the URL.
const MovieDetail = () => {
  const { id } = useParams(); // You would use this to fetch data

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 text-white">
        <h1 className="text-2xl font-bold">Movie Detail Page</h1>
        <p className="mt-4">Details for movie ID: {id} would be displayed here.</p>
      </div>
    </MainLayout>
  );
};

export default MovieDetail;
