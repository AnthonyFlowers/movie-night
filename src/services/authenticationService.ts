import { User } from "../components/AuthContext";
import { SERVER_URL } from "./API";

export const LOCAL_STORAGE_TOKEN_KEY = "mymedia-jwt-token";

export interface Credentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  passwordConfirm: string;
}
const AUTH_URL = `${SERVER_URL}/auth`;

const makeUser = (body: { jwt: string }): User => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, body.jwt);
  const sections = body.jwt.split(".");
  const json = atob(sections[1]);
  const parsed = JSON.parse(json);
  const user: User = {
    username: parsed.sub,
    appUserId: parsed.app_user_id,
    roles: parsed.authorities.split(","),
  };
  return user;
};

export async function authenticate(credentials: Credentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(`${AUTH_URL}`, init);
  if (response.ok) {
    const body = await response.json();
    return makeUser(body);
  } else if (response.status === 403) {
    return Promise.reject([
      "Could not login. Username/Password combination incorrect.",
    ]);
  } else {
    return Promise.reject(["Problem authenticating."]);
  }
}

export async function register(credentials: RegisterCredentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(`${AUTH_URL}/create_account`, init);
  if (response.ok) {
    const body = await response.json();
    return makeUser(body);
  } else if (response.status === 400) {
    const body = await response.json();
    return Promise.reject([body]);
  } else {
    console.log(response);
    return Promise.reject(["Error registering user"]);
  }
}

export async function refresh() {
  if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
    return Promise.reject(["no key in storage"]);
  }
  const init = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
    },
  };
  const response = await fetch(`${AUTH_URL}/refresh_token`, init);
  if (response.ok) {
    const body = await response.json();
    return makeUser(body);
  } else if (response.status === 403) {
    return Promise.reject([
      "authentication error not refreshed. token may have expired",
    ]);
  }
  return Promise.reject(["there was a problem refreshing your token"]);
}
