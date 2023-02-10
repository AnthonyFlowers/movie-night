import React, { useEffect, useState } from "react";
import { getGroups, Group } from "../services/groupService";
import { Movie } from "../services/movieService";

export const Home: React.FC = () => {
  const [groups, setGroups] = useState<{ group: Group; topMovie: Movie }[]>([]);
  const [errs, setErrs] = useState<string[]>([]);

  useEffect(() => {
    let nextErrs: string[] = [];
    getGroups()
      .then(setGroups)
      .catch((e) => {
        nextErrs += e;
      });
    setErrs(nextErrs);
  }, []);

  useEffect(() => {
    // console.log(errs);
  }, [errs]);

  return (
    <>
      {errs.length > 0 ? (
        <div className="alert alert-danger" role="alert">
          {errs.map((e) => {
            return <p>{e}</p>;
          })}
        </div>
      ) : (
        ""
      )}
      <h3>Public Groups</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            <th>Leading Movie</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => {
            return (
              <tr key={group.group.groupId}>
                <td>{group.group.groupName}</td>
                <td>{group.group.users.length}</td>
                <td>{group.topMovie.movieName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
