import { PinkButton } from "../components/common/button";
import Input from "../components/common/input";
import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <InputWrapper>
        <Title>아이디</Title>
        <Input placeholder="아이디를 입력해주세요." />
      </InputWrapper>
      <InputWrapper>
        <Title>비밀번호</Title>
        <Input placeholder="비밀번호를 입력해주세요." />
      </InputWrapper>
      <Button>로그인</Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin: 150px auto 0;
`;

const InputWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 12px;
  color: var(--gray400);
`;

const Button = styled(PinkButton)`
  padding: 10px 20px;
  width: 400px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
