//1. 액션 타입 만들기
export const SELECTED_EMOJI = "selected/SELECTED_EMOJI";
export const SELECTED_TEXT = "selected/SELECTED_TEXT";

//2. 액션 함수 생성
// 화살표 함수로 만들고 type 이랑 나중에 dispatch 쓸 때 넣어줄 변수 넣어서 만듦
export const selectedEmoji = (emoji) => ({
  type: SELECTED_EMOJI,
  emoji,
});

export const selectedText = (text) => ({
  type: SELECTED_TEXT,
  text,
});
