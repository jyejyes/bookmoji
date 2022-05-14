import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://bookmoji.site/",
  headers: {
    "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
  },
});
