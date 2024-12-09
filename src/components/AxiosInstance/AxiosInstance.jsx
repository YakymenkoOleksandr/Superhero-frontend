import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://superhero-backend-vrcc.onrender.com",
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;