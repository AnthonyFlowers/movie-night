import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authenticationService";
import AuthContext from "./AuthContext";

function CreateAccount() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
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
    if (credentials["password"] !== credentials["passwordConfirm"]) {
      setErrs(["Passwords do not match!"]);
      return;
    }

    register(credentials)
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
          onChange={handleChange}
          value={credentials["username"]}
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
          onChange={handleChange}
          value={credentials["password"]}
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
          onChange={handleChange}
          value={credentials["passwordConfirm"]}
          autoComplete="off"
        />
      </div>
      <button
        id="createAccount"
        className="btn btn-success form-control"
        type="submit"
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
