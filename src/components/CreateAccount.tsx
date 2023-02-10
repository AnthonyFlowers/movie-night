import { FormEvent, useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authenticationService";
import { AuthContext } from "./AuthContext";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errs, setErrs] = useState<string[]>([]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    register({ username, password, passwordConfirm })
      .then((user) => {
        login(user);
        navigate("/home");
      })
      .catch(setErrs);
  }

  return (
    <form id="registrationForm" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoComplete="off"
        />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          className="form-control"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="********"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          autoComplete="off"
        />
      </div>
      <button
        id="createAccount"
        className="btn btn-success form-control"
        type="submit"
        disabled={password !== passwordConfirm}
      >
        Register
      </button>
      {errs.length > 0 ? (
        <ul id="errors" className="">
          {errs.map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      ) : (
        <></>
      )}
    </form>
  );
}

export default CreateAccount;
