import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK 9d2e5171737c5341662bd9d51b2b634c`,
  },
});

//search book api
export const bookSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
