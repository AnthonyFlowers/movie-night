import { useState } from "react";
import { getMovieByName } from "../services/movieService";

export default function QuickAddMovie({ addMovie }) {
  const [addingMovie, setAddingMovie] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [errs, setErrs] = useState([]);

  function reset() {
    setMovieName("");
    setErrs("");
  }

  function toggleAddingMovie() {
    setAddingMovie(!addingMovie);
    reset();
  }

  function handleMovieNameChange(evt) {
    setMovieName(evt.target.value);
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
            onChange={handleMovieNameChange}
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
}
