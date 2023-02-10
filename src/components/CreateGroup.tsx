import React, { FormEvent, useContext, useState } from "react";
import { createGroup } from "../services/groupService";
import { Movie } from "../services/movieService";
import { AuthContext } from "./AuthContext";
import { QuickAddMovie } from "./QuickAddMovie";
import { QuickAddUser } from "./QuickAddUser";

export const CreateGroup: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [groupName, setGroupName] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  function removeMovie(index: number) {
    const nextMovies = [...movies];
    nextMovies.splice(index, 1);
    // const nextMovies = movies.filter((m) => m.movieId !== movieId);
    setMovies(nextMovies);
  }

  function removeUser(index: number) {
    const nextUsers = [...users];
    nextUsers.splice(index, 1);
    setUsers(nextUsers);
  }

  function addUser(newUser: string) {
    const nextUsers =
      newUser !== user?.username && users.indexOf(newUser) < 0
        ? [...users, newUser]
        : users;
    setUsers(nextUsers);
  }

  function addMovie(newMovie: Movie) {
    let nextMovies = [...movies];
    if (!movies.filter((m) => m.movieId === newMovie.movieId).length) {
      nextMovies.push(newMovie);
    }
    setMovies(nextMovies);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log({
      groupName: groupName,
      users: users,
      admin: user,
      movies: movies,
    });
    createGroup({
      groupId: null,
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
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="your group name"
          />
        </div>
        <div id="members" className="mt-3">
          <label className="form-label">Members:</label>
          <QuickAddUser addUser={addUser} />

          <p className="px-2 mb-0">{user ? `${user.username} (Admin)` : ""}</p>
          {users.map((u, i) => {
            return (
              <p key={i} className="px-2 my-0">
                {u}
                <span
                  className="btn btn-warning btn-custom-remove mx-3"
                  id={`user-${i}`}
                  onClick={(e) => removeUser.bind(i)}
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
                    onClick={(e) => removeMovie.bind(i)}
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
        <button className="btn btn-primary">Create Group</button>
      </form>
    </>
  );
};
