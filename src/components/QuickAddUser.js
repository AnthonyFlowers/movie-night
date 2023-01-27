import { useState } from "react";
import { doesUserExist } from "../services/userService";

export default function QuickAddUser({ addUser }) {
  const [addingUser, setAddingUser] = useState(false);
  const [username, setUsername] = useState("");
  const [errs, setErrs] = useState([]);

  function reset() {
    setUsername("");
    setErrs([]);
  }

  function toggleAddingUser() {
    setAddingUser(!addingUser);
    reset();
  }

  function handleUsernameChange(evt) {
    setUsername(evt.target.value);
  }

  function handleAddUser(evt) {
    doesUserExist(username)
      .then((u) => {
        addUser(u);
        reset();
      })
      .catch(setErrs);
  }

  return (
    <div className="m-2 d-inline">
      <button
        className={`btn btn-${
          addingUser ? "danger" : "success"
        } transition btn-custom-remove m-0`}
        type="button"
        onClick={toggleAddingUser}
        data-bs-toggle="collapse"
        data-bs-target="#collapsableInput"
      >
        {addingUser ? "▼" : "+"}
      </button>
      <div id="collapsableInput" className="collapse collapse-horizontal">
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={handleAddUser}
          >
            Add
          </button>
          <input
            value={username}
            className={`form-control me-2`}
            onChange={handleUsernameChange}
            placeholder="enter username"
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
