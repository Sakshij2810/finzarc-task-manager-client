import API from "../../utils/api";

const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Throw the error with a user-friendly message
    const errorMessage =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(errorMessage);
  }
};

const login = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Throw the error with a user-friendly message
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
