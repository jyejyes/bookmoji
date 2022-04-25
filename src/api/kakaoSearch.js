import axios from "axios";

const Kakao = axios.create({
  baseURL: "http://dapi.kakao.com",
  header: {
    Authorization: "KaKaoAK 4a29ee944bb39f8ca4a9177c8503bad4",
  },
});

export const kakaoSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
