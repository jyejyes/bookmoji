import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://bookmoji.site/",
});

apiClient.interceptors.request.use((config) => ({
  ...config,
  headers: {
    "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
  },
}));
