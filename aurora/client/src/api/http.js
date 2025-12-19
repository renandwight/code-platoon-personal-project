import { api } from "./api";

// https://pankaj-kumar.medium.com/how-to-use-interceptor-with-react-to-set-auth-header-with-api-request-a25e70c03a94

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, 
error => {Promise.reject(error)});

// watchlists/
// Create watchlist    POST /watchlists/

export async function createWatchlist(name) {
    const response = await api.post("watchlists/", {name});
    return response.data;
}

// Load dashboard      GET /watchlists/
export async function getWatchlists() {
    const response = await api.get("watchlists/");
    return response.data;
}

{/* <int:watchlist_id>/ */}
// Open watchlist      GET /watchlists/:id
export async function getAWatchlist(watchlistId) {
  const response = await api.get(`watchlists/${watchlistId}/`);
  return response.data;
}

// Rename watchlist    PUT /watchlists/:id
export async function renameWatchlist(watchlistId, newName) {
  const response = await api.put(`watchlists/${watchlistId}/`, newName);
  return response.data;
}

// Delete watchlist    DELETE /watchlists/:id
export async function deleteAWatchlist(watchlistId) {
  const response = await api.delete(`watchlists/${watchlistId}/`);
  return response.data;
}

{/* <int:watchlist_id>/items/ */}
// Load tickers        GET /watchlists/:id/items/
export async function getWatchlistItems(watchlistId) {
  const response = await api.get(`watchlists/${watchlistId}/items/`);
  console.log(response)
  return response.data;
}

{/* Add ticker          POST /watchlists/:id/items/ */}
export async function addTicker(watchlistId, tickerSummary) {
  const response = await api.post(`watchlists/${watchlistId}/items/`, tickerSummary);
  console.log(watchlistId)
  return response.data;
}

{/* <int:watchlist_id>/items/<int:item_id>/
Remove ticker       DELETE /watchlists/:id/items/:item_id/ */}
export async function removeWatchlistItem(watchlistId, itemId) {
  const response = await api.delete(`watchlists/${watchlistId}/items/${itemId}/`);
  return response.data;
}