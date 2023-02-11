import axios from "axios";

interface BookSearchProps {
  query: string;
  page: number;
  size: number;
}

export const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}`,
  },
});

//search book api
export const bookSearch = (params: BookSearchProps) => {
  return Kakao.get("/v3/search/book", { params });
};
