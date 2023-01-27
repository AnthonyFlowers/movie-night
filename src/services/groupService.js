import { SERVER_URL } from "./API";
import { LOCAL_STORAGE_TOKEN_KEY } from "./authenticationService";

const groupApi = `${SERVER_URL}/api/movie-night/group`;

export async function getGroups() {
  const response = await fetch(`${groupApi}/with-top-movies`);
  if (response.ok) {
    const body = await response.json();
    return body;
  }
  return Promise.reject(["error fetching groups: " + response.status]);
}

export function getUserGroups() {}

export async function createGroup(group) {
  const response = await fetch(`${groupApi}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
    },
    body: JSON.stringify(group),
  });
  if (response.ok) {
    return Promise.resolve("Group Created");
  } else {
    const body = response.body;
    return Promise.reject([body]);
  }
}

export function editGroup(group) {}