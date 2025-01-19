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

export enum Height {
  "150~160" = "150~160",
  "160~165" = "160~165",
  "165~170" = "165~170",
  "170~175" = "170~175",
  "175~180" = "175~180",
  "180~" = "180~",
}

export enum Gender {
  남 = "남",
  여 = "여",
}

export interface UserInfo {
  name?: string;
  mood?: string;
  height?: string;
  gender?: string;
}

export interface User extends UserInfo {
  uid: string;
  email: string;
  imageUrl: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserData extends UserInfo {
  email: string;
  password: string;
}
