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
    console.log(err)
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
    alert(response.data);
    return null;
  } catch (err) {
    console.log(err, "Signup Failed")
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
    alert(response.data);
    return null;
  } catch (err) {
    console.log(err, "Login Failed")
  }
};

export const logOut = async () => {
  const response = await api.post("users/logout/");
  if (response.status === 204) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return null;
  }
  alert("Unable to log out, something went wrong");
};