import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticationService";
import AuthContext from "./AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const [errs, setErrs] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    evt.preventDefault();
    const newCredentials = { ...credentials };
    newCredentials[evt.target.name] = evt.target.value;
    setCredentials(newCredentials);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    authenticate(credentials)
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
          onChange={handleChange}
          value={credentials["username"]}
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
          onChange={handleChange}
          value={credentials["password"]}
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
}

export default Login;
