import { getAuthHeaders } from "./api";
import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001"; // Your backend URL

// Register new user
export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

// Login user
export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// Get user info (check token)
export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = (userData, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(userData),
  }).then(checkResponse);
};
