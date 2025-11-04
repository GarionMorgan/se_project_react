const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.knowtwrtoday.jumpingcrab.com"
    : "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
});

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const addItem = (item, token) => {
  const { _id, ...cleanData } = item;

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(cleanData),
  }).then(checkResponse);
};

const deleteItem = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  }).then(checkResponse);
};

const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(token),
  }).then(checkResponse);
};

const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
