import { useState } from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";

export default function AuthPage() {
  const [formState, setFormState] = useState("login");

  function handleFormChange(event) {
    setFormState(event.target.value);
  }

  return (
    <div className="w-75 mx-auto mt-5">
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link${formState === "login" ? " active" : ""}`}
            value="login"
            onClick={handleFormChange}
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link${formState === "register" ? " active" : ""}`}
            value="register"
            onClick={handleFormChange}
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
}
