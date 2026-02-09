import api from "./api";

export const getAllMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const getMovieById = async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
};

export const getMoviesByFilter = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await api.get(`/movies?${query}`);
  return response.data;
};