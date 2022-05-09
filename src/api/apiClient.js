import axios from "axios";

const base = "https://bookmoji.site/";
console.log(localStorage.getItem("jwt"));

export const apiClient = axios.create({
  baseURL: base,
  headers: {
    "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
  },
});
