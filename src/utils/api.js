// const baseUrl = "http://localhost:3001/se_project_react";
const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem, checkResponse };
