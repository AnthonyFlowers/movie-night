import { createContext } from "react";

export interface User {
  appUserId: number;
  username: string;
  roles: string[];
}

export interface Auth {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const initialAuth = {
  user: null,
  login: (u: User) => {},
  logout: () => {},
};

export const AuthContext = createContext<Auth>(initialAuth);
