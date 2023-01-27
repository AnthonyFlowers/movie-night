import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const navLinks = [
  {
    name: "Home",
    urls: ["", "home"],
  },
  {
    name: "Trending",
    urls: ["trending"],
  },
];

const authLinks = [
  {
    name: "Create Group",
    urls: ["create-group"],
  },
  {
    name: "Join Group",
    urls: ["join-group"],
  },
  {
    name: "My Groups",
    urls: ["my-groups"],
  },
];

export default function Navbar() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    var nextActivePage = "";
    const potential = navLinks.filter((n) =>
      n.urls.includes(location.pathname.substring(1))
    );
    if (potential.length) {
      nextActivePage = potential[0].name;
    }
    setActivePage(nextActivePage);
  }, [location.pathname]);

  return (
    <nav className={`navbar navbar-expand-lg rounded`}>
      <div className="container-fluid">
        <Link
          onClick={setActivePage.bind(null, "Home")}
          className="navbar-brand"
          to="/"
        >
          Movie Night!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
            {navLinks.map((i) => {
              return (
                <Link
                  key={i.urls[0]}
                  onClick={setActivePage.bind(null, i.name)}
                  className={`nav-link${
                    activePage === i.name ? " active" : ""
                  }`}
                  aria-current="page"
                  to={i.urls[0]}
                >
                  {i.name}
                </Link>
              );
            })}
            {!user ? (
              <Link
                onClick={setActivePage.bind(null, "login")}
                className={`nav-link${
                  ["login", "register"].includes(location.pathname.substring(1))
                    ? " active"
                    : ""
                }`}
                aria-current="page"
                to="login"
              >
                Login
              </Link>
            ) : (
              <>
                {authLinks.map((i) => {
                  return (
                    <Link
                      key={i.urls[0]}
                      onClick={setActivePage.bind(null, i.name)}
                      className={`nav-link${
                        activePage === i.name ? " active" : ""
                      }`}
                      aria-current="page"
                      to={i.urls[0]}
                    >
                      {i.name}
                    </Link>
                  );
                })}
                <Link onClick={logout} className="nav-link">
                  Logout: {user.sub}
                </Link>
              </>
            )}
          </ul>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
