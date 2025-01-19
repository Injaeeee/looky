import { Gender, Height, Mood, User } from "./user.types";
import { Tag } from "./tag.types";

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
  fall = "fall",
  Winter = "Winter",
}

export interface ArticleInfo {
  title: string;
  mood: Mood;
  tpo: TPO;
  season: Season;
  content: string;
  writer: User | null;
}

export interface PostArticle extends ArticleInfo {
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  imageURL: string | undefined;
  likeCount: number;
}

export interface Article extends PostArticle {
  id: string;
}

export interface ArticleFilter {
  season?: Season | null;
  tpo?: TPO | null;
  mood?: Mood | null;
  gender?: Gender | null;
  height?: Height | null;
}
