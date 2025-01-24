import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(10, "제목은 최대 10자 이하로 입력해주세요."),
  content: z.string().max(30, "소개글은 최대 30자 이하로 입력해주세요."),
});
