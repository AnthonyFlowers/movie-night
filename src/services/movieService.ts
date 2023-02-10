import { SERVER_URL } from "./API";

const movieApi = `${SERVER_URL}/api/movie`;

export interface Movie {
  movieId: number;
  movieName: string;
  movieYear: number;
  movieLength: number;
  movieOverview: string;
}

export async function getMovieByName(movieName: string) {
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
