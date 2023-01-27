import { useContext } from "react";
import { useState } from "react";
import { createGroup } from "../services/groupService";
import AuthContext from "./AuthContext";
import QuickAddMovie from "./QuickAddMovie";
import QuickAddUser from "./QuickAddUser";

export default function CreateGroup() {
  const { user } = useContext(AuthContext);
  const [groupName, setGroupName] = useState("");

  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [errs, setErrs] = useState([]);

  function handleNameChange(evt) {
    setGroupName(evt.target.value);
  }

  function removeMovie(evt) {
    const index = parseInt(evt.target.id.split("-")[1]);
    const nextMovies = [...movies];
    nextMovies.splice(index, 1);
    // const nextMovies = movies.filter((m) => m.movieId !== movieId);
    setMovies(nextMovies);
  }

  function removeUser(evt) {
    const index = parseInt(evt.target.id.split("-")[1]);
    const nextUsers = [...users];
    nextUsers.splice(index, 1);
    setUsers(nextUsers);
  }

  function addUser(newUser) {
    const nextUsers =
      newUser !== user.sub && users.indexOf(newUser) < 0
        ? [...users, newUser]
        : users;
    setUsers(nextUsers);
  }

  function addMovie(newMovie) {
    let nextMovies = [...movies];
    if (!movies.filter((m) => m.movieId === newMovie.movieId).length) {
      nextMovies.push(newMovie);
    }
    setMovies(nextMovies);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // console.log(evt);
    console.log({
      groupName: groupName,
      users: users,
      admin: user,
      movies: movies,
    });
    createGroup({
      groupName: groupName,
      users: users.map((u) => {
        return { username: u };
      }),

      movies: movies,
    })
      .then(console.log)
      .catch(console.log);
  }

  return (
    <>
      <h3>Create Group</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            id="groupName"
            className="form-control"
            onChange={handleNameChange}
            placeholder="your group name"
          />
        </div>
        <div id="members" className="mt-3">
          <label className="form-label">Members:</label>
          <QuickAddUser addUser={addUser} />

          <p className="px-2 mb-0">{user ? `${user.sub} (Admin)` : ""}</p>
          {users.map((u, i) => {
            return (
              <p key={i} className="px-2 my-0">
                {u}
                <span
                  className="btn btn-warning btn-custom-remove mx-3"
                  id={`user-${i}`}
                  onClick={removeUser}
                >
                  Remove
                </span>
              </p>
            );
          })}
        </div>
        <div id="movies" className="mt-3">
          <label className="form-label">Movies:</label>
          <QuickAddMovie addMovie={addMovie} />
          {movies.length ? (
            movies.map((m, i) => {
              return (
                <p key={i} className="px-2 my-0">
                  {m.movieName}
                  <span
                    className="btn btn-warning btn-custom-remove mx-3"
                    id={`movie-${i}`}
                    onClick={removeMovie}
                  >
                    Remove
                  </span>
                </p>
              );
            })
          ) : (
            <p className="px-3">no movies added</p>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Create Group
        </button>
      </form>
    </>
  );
}
