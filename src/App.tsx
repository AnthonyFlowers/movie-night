import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext, User } from "./components/AuthContext";
import AuthPage from "./components/AuthPage";
import CreateAccount from "./components/CreateAccount";
import { CreateGroup } from "./components/CreateGroup";
import { Home } from "./components/Home";
import { JoinGroup } from "./components/JoinGroup";
import { MyGroups } from "./components/MyGroups";
import { Navbar } from "./components/Navbar";
import { Trending } from "./components/Trending";
import {
  LOCAL_STORAGE_TOKEN_KEY,
  refresh,
} from "./services/authenticationService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [refreshed, setRefreshed] = useState(false);
  const login = setUser;

  const auth = {
    user,
    login: (u: User): void => {
      setUser(u);
    },
    logout: (): void => {
      setUser(null);
    },
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  useEffect(() => {
    refresh()
      .then((user) => {
        login(user);
        setRefreshed(true);
      })
      .catch((e) => {
        logout();
        console.log(e);
        setRefreshed(true);
      });
  }, [login]);

  return refreshed ? (
    <AuthContext.Provider value={auth}>
      <div className="m-4">
        <BrowserRouter>
          <Navbar />
          <div className="m-3 rounded p-5 border">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/join-group" element={<JoinGroup />} />
              <Route path="/my-groups" element={<MyGroups />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<CreateAccount />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  ) : (
    <div className="spinner-border animate-spin" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default App;
