import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticationService";
import { AuthContext } from "./AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [errs, setErrs] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    evt.stopPropagation();

    authenticate({ username, password })
      .then((user) => {
        login(user);
        navigate("/");
      })
      .catch(setErrs);
  }

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
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
        />
      </div>
      <button id="login" className="btn btn-success form-control" type="submit">
        Login
      </button>

      <div id="errorDiv">
        {errs.map((e) => {
          return <p key={e}>{e}</p>;
        })}
      </div>
    </form>
  );
};

export default Login;
