export enum Mood {
  미니멀 = "미니멀",
  캐주얼 = "캐주얼",
  아메카지 = "아메카지",
  시티보이 = "시티보이",
  스트릿 = "스트릿",
  스포티 = "스포티",
  유니크 = "유니크",
  러블리 = "러블리",
  레트로 = "레트로",
}

export type User = {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  weight: number;
  createdAt: string;
  updatedAt: string;
};
