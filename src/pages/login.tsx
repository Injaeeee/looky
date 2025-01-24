import { PinkButton } from "../components/common/button";
import { Input } from "../components/common/input";
import styled from "styled-components";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../util/user.api";
import { Image } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";
import { loginSchema } from "../constants/schemas/userSchema";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    await loginUser({
      email: data.email,
      password: data.password,
    });
    navigate("/");
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Image src="/image/loginLogo.png" alt="logo" />
      <InputWrapper>
        <Title>이메일</Title>
        <Input placeholder="이메일을 입력해주세요." {...register("email")} />
        {errors.email && (
          <ErrorText>{errors.email.message as string}</ErrorText>
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
      <Button type="submit">로그인</Button>
      <SignUpLink to="/signup">회원이 아니신가요? {">"}</SignUpLink>
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

  @media (max-width: 768px) {
    width: 350px;
  }
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
