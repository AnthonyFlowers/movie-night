import React, { MouseEvent, MouseEventHandler, useState } from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";

const AuthPage: React.FC = () => {
  const [formState, setFormState] = useState("login");

  function handleFormChange(value: string) {
    setFormState(value);
  }

  return (
    <div className="w-75 mx-auto mt-5">
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link${formState === "login" ? " active" : ""}`}
            value="login"
            onClick={handleFormChange.bind(null, "login")}
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link${formState === "register" ? " active" : ""}`}
            value="register"
            onClick={handleFormChange.bind(null, "register")}
          >
            Register
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {formState === "login" ? <Login /> : <CreateAccount />}
      </div>
    </div>
  );
};

export default AuthPage;
