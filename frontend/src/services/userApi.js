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
