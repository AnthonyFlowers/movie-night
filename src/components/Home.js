import { useEffect, useState } from "react";
import { getGroups } from "../services/groupService";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [errs, setErrs] = useState([]);

  useEffect(() => {
    let nextErrs = [];
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
        <div class="alert alert-danger" role="alert">
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
          {groups.map((groupWithTopMovie) => {
            return (
              <tr key={groupWithTopMovie.group.groupId}>
                <td>{groupWithTopMovie.group.groupName}</td>
                <td>{groupWithTopMovie.group.users.length}</td>
                <td>{groupWithTopMovie.topMovie.movieName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
