import { api } from "./api";

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