import { SERVER_URL } from "./API";

const movieApi = `${SERVER_URL}/api/movie`;

export async function getMovieByName(movieName) {
  movieName = movieName.trim();
  if (movieName === "") {
    return Promise.reject(["empty search"]);
  }
  const response = await fetch(`${movieApi}/find-by-name?title=${movieName}`);
  if (response.status === 200) {
    return await response.json();
  }
  return Promise.reject(["could not find that movie"]);
}
