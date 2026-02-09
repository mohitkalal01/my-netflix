import api from "./api";

export const getContinueWatching = async (): Promise<any[]> => {
  const response = await api.get("/users/watch-history");
  return response.data;
};

export const updateWatchProgress = async (
  movieId: string,
  currentTime: number,
  duration: number
): Promise<void> => {
  await api.post("/users/watch-history", {
    movieId,
    currentTime,
    duration,
  });
};

export const getMyList = async (): Promise<any[]> => {
  const response = await api.get("/users/mylist");
  return response.data;
};

export const addToMyList = async (movieId: string): Promise<any[]> => {
  const response = await api.post("/users/mylist", { movieId });
  return response.data;
};

export const removeFromMyList = async (movieId: string): Promise<any[]> => {
  const response = await api.delete(`/users/mylist/${movieId}`);
  return response.data;
};
