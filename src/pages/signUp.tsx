import { PinkButton } from "../components/common/button";
import { Input } from "../components/common/input";
import styled from "styled-components";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { signUpUser } from "../util/user.api";
import { Image } from "@chakra-ui/react";
import {
  GenderSelect,
  HeightSelect,
  MoodSelect,
} from "../components/common/select";
import { useAuthStore } from "../store/authStore";
import { signUpSchema } from "../constants/schemas/userSchema";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordCheckVisibility = () => {
    setShowPasswordCheck((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    await signUpUser({
      email: data.email,
      password: data.password,
      name: data.name,
      height: data.height,
      gender: data.gender,
      mood: data.mood,
    });

    navigate("/login");
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Image src="/image/loginLogo.png" alt="logo" />
      <InputWrapper>
        <Title>이름</Title>
        <Input placeholder="이름을 입력해주세요." {...register("name")} />
        {errors.name && <ErrorText>{errors.name.message as string}</ErrorText>}
      </InputWrapper>
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
      <InputWrapper>
        <Title>비밀번호 확인</Title>
        <Input
          placeholder="비밀번호를 재입력해주세요."
          type={showPasswordCheck ? "text" : "password"}
          {...register("passwordCheck")}
        />
        {errors.passwordCheck && (
          <ErrorText>{errors.passwordCheck.message as string}</ErrorText>
        )}
        <IconWrapper onClick={togglePasswordCheckVisibility}>
          {showPasswordCheck ? (
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

      <SelectWrapper>
        <InputWrapper>
          <Title>무드</Title>
          <MoodSelect {...register("mood")} />
          {errors.mood && (
            <ErrorText>{errors.mood.message as string}</ErrorText>
          )}
        </InputWrapper>
        <InputWrapper>
          <Title>키</Title>
          <HeightSelect {...register("height")} />
          {errors.height && (
            <ErrorText>{errors.height.message as string}</ErrorText>
          )}
        </InputWrapper>
        <InputWrapper>
          <Title>성별</Title>
          <GenderSelect {...register("gender")} />
          {errors.gender && (
            <ErrorText>{errors.gender.message as string}</ErrorText>
          )}
        </InputWrapper>
      </SelectWrapper>
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
  margin: 30px auto;

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

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-around;
`;
