import { Input, Select, Image, Textarea } from "@chakra-ui/react";
import styled from "styled-components";

export default function EtcContent({
  goToPreviousStep,
}: {
  goToPreviousStep: () => void;
}) {
  return (
    <ArticleContent>
      <UserSpec>
        <UserName>@injae</UserName>
        <UserDetail>175cm 70kg</UserDetail>
      </UserSpec>

      <InputWrapper>
        <Title>계절</Title>
        <Select
          width="auto"
          placeholder="옵션"
          borderColor="white"
          focusBorderColor="pink.100"
          size="lg"
          _hover={{ borderColor: "pink.200" }}
        >
          <option>123</option>
        </Select>
      </InputWrapper>
      <InputWrapper>
        <Title>소개</Title>
        <Textarea
          focusBorderColor="pink.100"
          size="lg"
          placeholder="소개글을 입력해주세요."
          rows={5}
        />
      </InputWrapper>
      <InputWrapper>
        <Title>TPO</Title>
        <Select
          width="auto"
          placeholder="옵션"
          borderColor="white"
          focusBorderColor="pink.100"
          size="lg"
          _hover={{ borderColor: "pink.200" }}
        >
          <option>123</option>
        </Select>
      </InputWrapper>
      <InputWrapper>
        <Title>MOOD</Title>
        <Select
          width="auto"
          placeholder="옵션"
          borderColor="white"
          focusBorderColor="pink.100"
          size="lg"
          _hover={{ borderColor: "pink.200" }}
        >
          <option>123</option>
        </Select>
      </InputWrapper>
      <ButtonWrapper>
        <PrevButton onClick={goToPreviousStep}>이전으로</PrevButton>
        <ShareButton>공유하기</ShareButton>
      </ButtonWrapper>
    </ArticleContent>
  );
}

const ArticleContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
`;

const UserSpec = styled.div`
  display: flex;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const UserDetail = styled.p`
  font-size: 14px;
  font-weight: 200;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Explanation = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: var(--pink100);
`;

const MakeTagButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--pink100);
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: var(--pink100);
  width: 105px;
  height: 32px;
  margin-left: auto;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 5px;
`;

const PrevButton = styled.button`
  border: 1px solid var(--pink100);
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  padding: 7px 12px;
  color: var(--pink100);
`;

const ShareButton = styled.button`
  background-color: var(--pink100);
  color: black;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  padding: 7px 12px;
`;
