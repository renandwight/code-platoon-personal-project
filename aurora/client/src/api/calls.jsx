import axios from "axios";

// Establish base url for all api methods
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
})

// News Data
export function fetchNews() {
    return api.get("news/").then((response) => response.data)
}

// Market Data
export function fetchMarket(ticker, cash) {
    return api.get(`markets/${ticker}/${cash}/`).then((response) => response.data)
}

// User Functions
export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.get("users/");
    return response.data;
  } catch (err) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return null;
  }
};

export const signUp = async ({ email, password }) => {
  try {
    const response = await api.post("users/signup/", { email, password });
    if (response.status === 201 || response.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user;
    }
    return null;
  } catch (err) {
    const msg =
      err?.response?.data?.detail ||
      err?.response?.data?.error ||
      err?.response?.data ||
      "Signup failed";
    throw msg;
  }
};

export const logIn = async ({ email, password }) => {
  try {
    const response = await api.post("users/login/", { email, password });
    if (response.status === 200) {
      const { email, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return email;
    }
    return null;
  } catch (err) {
    const msg =
      err?.response?.data?.detail ||
      err?.response?.data?.error ||
      err?.response?.data ||
      "Login failed";
    throw msg;
  }
};

export const logOut = async () => {
  const response = await api.post("users/logout/");
  if (response.status === 204) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return null;
  }
  throw new Error("Unable to log out, something went wrong");
};


// watchlists/
// Load dashboard      GET /watchlists/
// Create watchlist    POST /watchlists/

// <int:watchlist_id>/
// Open watchlist      GET /watchlists/:id
// Rename watchlist    PUT /watchlists/:id
// Delete watchlist    DELETE /watchlists/:id

// <int:watchlist_id>/items/
// Load tickers        GET /watchlists/:id/items/
// Add ticker          POST /watchlists/:id/items/

// <int:watchlist_id>/items/<int:item_id>/
// Remove ticker       DELETE /watchlists/:id/items/:item_id/