import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .max(20, { message: "10자 이하로 입력해주세요." }),
  email: z
    .string()
    .email({ message: "유효한 이메일 주소를 입력해주세요." })
    .min(1, { message: "이메일은 필수 항목입니다." })
    .max(30, { message: "이메일은 30자 이하로 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하로 입력해주세요." }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "이름을 입력해주세요." })
      .max(20, { message: "10자 이하로 입력해주세요." }),
    email: z
      .string()
      .email({ message: "유효한 이메일 주소를 입력해주세요." })
      .min(1, { message: "이메일은 필수 항목입니다." })
      .max(30, { message: "이메일은 30자 이하로 입력해주세요." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하로 입력해주세요." }),
    passwordCheck: z.string(),
    mood: z.string().min(1, { message: "무드를 선택해주세요." }),
    height: z.string().min(1, { message: "키를 선택해주세요." }),
    gender: z.string().min(1, { message: "성별을 선택해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });
