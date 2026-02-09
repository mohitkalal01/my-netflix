import api from "./api";

export const getContinueWatching = async () => {
  const response = await api.get("/users/continue-watching");
  return response.data;
};

export const updateWatchProgress = async (movieId, currentTime, duration) => {
  await api.post("/users/watch-progress", {
    movieId,
    currentTime,
    duration,
  });
};

export const getMyList = async () => {
  const response = await api.get("/users/my-list");
  return response.data;
};

export const addToMyList = async (movieId) => {
  const response = await api.post("/users/my-list", { movieId });
  return response.data;
};

export const removeFromMyList = async (movieId) => {
  const response = await api.delete(`/users/my-list/${movieId}`);
  return response.data;
};
