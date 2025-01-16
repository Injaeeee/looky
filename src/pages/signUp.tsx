import { PinkButton } from "../components/common/button";
import Input from "../components/common/input";
import styled from "styled-components";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "아이디는 필수 항목입니다." })
    .max(20, { message: "아이디는 20자 이하로 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하로 입력해주세요." }),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("아이디:", data.username);
    console.log("비밀번호:", data.password);
    console.log(errors); // 오류 객체 확인
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Title>아이디</Title>
        <Input placeholder="아이디를 입력해주세요." {...register("username")} />
        {errors.username && (
          <ErrorText>{errors.username.message as string}</ErrorText>
        )}
      </InputWrapper>
      <InputWrapper>
        <Title>비밀번호</Title>
        <Input
          placeholder="비밀번호를 입력해주세요."
          type={showPassword ? "text" : "password"}
          {...register("password")}
        />
        {errors.password && (
          <ErrorText>{errors.password.message as string}</ErrorText>
        )}
        <IconWrapper onClick={togglePasswordVisibility}>
          {showPassword ? (
            <ViewOffIcon boxSize={10} color="white" />
          ) : (
            <ViewIcon boxSize={10} color="white" />
          )}
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <Title>비밀번호 확인</Title>
        <Input
          placeholder="비밀번호를 재입력해주세요."
          type={showPassword ? "text" : "password"}
          {...register("password")}
        />
        {errors.password && (
          <ErrorText>{errors.password.message as string}</ErrorText>
        )}
        <IconWrapper onClick={togglePasswordVisibility}>
          {showPassword ? (
            <ViewOffIcon boxSize={10} color="white" />
          ) : (
            <ViewIcon boxSize={10} color="white" />
          )}
        </IconWrapper>
      </InputWrapper>
      <WarningWrapper>
        <InfoOutlineIcon boxSize={6} color="white" />
        <WarningText>
          한번 만든 아이디는 변경할 수 없으니, 오타가 없도록 신중히 확인해
          주세요.
        </WarningText>
      </WarningWrapper>

      <Button type="submit">회원가입</Button>
      <SignUpLink to="/login">이미 회원이신가요? {">"}</SignUpLink>
    </Container>
  );
}

const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 450px;
  align-items: center;
  margin: 150px auto 0;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 12px;
  color: var(--gray400);
`;

const Button = styled(PinkButton)`
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: var(--pink100);
  position: absolute;
  bottom: -25px;
  left: 0;
`;

const SignUpLink = styled(Link)`
  position: absolute;
  bottom: -50px;
  right: 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: var(--gray400);
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const WarningText = styled.p`
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  color: var(--gray400);
`;
