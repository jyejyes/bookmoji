//api
export interface ApiResult<T> {
  code: number;
  isSuccess: boolean;
  message: string;
  result: T;
}

//로그인 타입
export interface LoginFormData {
  email: string;
  password: string;
}
//회원가입 타입
export interface RegisterFormData extends LoginFormData {
  pwCheck?: string;
  nickname: string;
}

//책 기본 타입
export interface BookProps {
  author?: string;
  emoji: string;
  introduction?: string;
  isbn?: string;
  publisher?: string;
  releaseYear?: string;
  reviewIdx: number;
  thumbnailUrl: string;
  title: string;
}

//내 리뷰 책 타임
export interface MyReviewProps extends BookProps {
  reviewTime: string;
  text: string;
}

// 다른책 리뷰 타입
export interface GetOtherReviewsProps {
  result: OtherReviewProps[];
}
export interface OtherReviewProps extends BookProps {
  hasLiked: number;
  text: string;
}

// 카카오 책 검색 API props
export interface GetKakaoBooksProps {
  documents: KakaoBook[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export interface KakaoBook {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

//유저 페이지
export interface UserNicknameFormData {
  nickname: string;
}
export interface UserPasswordormData {
  currentPw: string;
  password: string;
  pwCheck?: string;
}

export interface ChangePasswordFormData {
  userIdx: number;
  currentPassword: string;
  newPassword: string;
  pwCheck?: string;
}

//월별 차트 데이터 타입
export interface MonthChartData {
  month: number;
  monthlyCount: number;
}

//이모지별 차트 데이터 타입
export interface EmojiChartData {
  emoji: string;
  emojiPercentage: string;
}
