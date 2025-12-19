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