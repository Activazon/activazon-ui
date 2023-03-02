import fetch from "node-fetch";
import process from "process";

const apiFetch = async (endpointPath, options) => {
  const apiPrefix = process.env.ACTIVAZON_API;
  const apiKey = process.env.ACTIVAZON_API_KEY;

  const url = `${apiPrefix}${endpointPath}`;
  const headers = {
    Authorization: apiKey,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
};

// auth
export const authSignIn = async (username, password) =>
  apiFetch(`/v2/accounts/auth/signin/`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });

export const authSignUp = async ({
  username,
  usernameVerify,
  password,
  locale,
  firstName,
  lastName,
}) =>
  apiFetch(`/v2/accounts/auth/signup/`, {
    method: "POST",
    body: JSON.stringify({
      username,
      username_verify: usernameVerify,
      password,
      locale,
      first_name: firstName,
      last_name: lastName,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
