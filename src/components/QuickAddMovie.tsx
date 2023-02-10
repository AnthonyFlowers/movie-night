import React, { useState } from "react";
import { getMovieByName, Movie } from "../services/movieService";

export const QuickAddMovie: React.FC<{
  addMovie: (newMovie: Movie) => void;
}> = ({ addMovie }) => {
  const [addingMovie, setAddingMovie] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [errs, setErrs] = useState<string[]>([]);

  function reset() {
    setMovieName("");
    setErrs([""]);
  }

  function toggleAddingMovie() {
    setAddingMovie(!addingMovie);
    reset();
  }

  function handleAddMovie() {
    getMovieByName(movieName)
      .then((movie) => {
        addMovie(movie);
        reset();
      })
      .catch(setErrs);
  }

  return (
    <div className="m-2 d-inline">
      <button
        className={`btn btn-${
          addingMovie ? "danger" : "success"
        } transition btn-custom-remove m-0`}
        type="button"
        onClick={toggleAddingMovie}
        data-bs-toggle="collapse"
        data-bs-target="#collapsableMovieInput"
      >
        {addingMovie ? "▼" : "+"}
      </button>
      <div id="collapsableMovieInput" className="collapse collapse-horizontal">
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={handleAddMovie}
          >
            Add
          </button>
          <input
            value={movieName}
            className={`form-control me-2`}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="enter movie name"
          />
        </div>
      </div>
      {errs.length
        ? errs.map((e) => (
            <small className="ms-2 text-danger" key={e}>
              - {e}
            </small>
          ))
        : ""}
    </div>
  );
};
