import { Mood } from "./user.types";

export enum TPO {
  바다 = "바다",
  카페 = "카페",
  여행 = "여행",
  캠퍼스 = "캠버스",
  데이트 = "데이트",
  출근 = "출근",
  결혼식 = "결혼식",
  데일리 = "데일리",
}

export enum Season {
  Spring = "Spring",
  Summer = "Summer",
  Sparkling = "Sparkling",
  Winter = "Winter",
}

export type Writer = {
  image?: string;
  nickname: string;
  id: number;
};

export type Article = {
  id: number;
  tag: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
  writer: Writer;
  likeCount: number;
  mood: Mood;
  TPO: TPO;
  Season: Season;
  content: string;
};

export type ArticleValue = {
  title: string;
  content: string;
  image: File | null;
};
