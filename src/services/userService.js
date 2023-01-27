import { SERVER_URL } from "./API";
import { LOCAL_STORAGE_TOKEN_KEY } from "./authenticationService";

const USER_API = `${SERVER_URL}/api/user`;

export async function doesUserExist(username) {
  if(username === ""){
    return Promise.reject(["blank user"])
  }
  const response = await fetch(`${USER_API}/exists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  });
  if (response.status === 200) {
    console.log(username)
    return Promise.resolve(username);
  } else {
    return Promise.reject([
      "that user doesn't exist or their account is disabled",
    ]);
  }
}
