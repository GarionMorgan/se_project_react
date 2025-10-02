// const baseUrl = "http://localhost:3001/se_project_react";
const baseUrl = "http://localhost:3001";

const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export { getItems, addItem, deleteItem };
