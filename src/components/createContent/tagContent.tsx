import { Input, Select, Image } from "@chakra-ui/react";
import styled from "styled-components";

export default function TagContent({
  goToNextStep,
  handleAddTag,
  tagInfo,
  handleTagInfoChange,
}: {
  goToNextStep: () => void;
  handleAddTag: () => void;
  tagInfo: { category: string; price: number; productName: string };
  handleTagInfoChange: (field: keyof typeof tagInfo, value: string) => void;
}) {
  return (
    <ArticleContent>
      <UserSpec>
        <UserName>@injae</UserName>
        <UserDetail>175cm 70kg</UserDetail>
      </UserSpec>
      <InputWrapper>
        <Title>
          제목<span>*</span>
        </Title>
        <Input
          focusBorderColor="pink.100"
          size="lg"
          placeholder="댓글을 입력해주세요."
        />
      </InputWrapper>
      <Explanation>태그 생성을 위한 필수 정보를 입력해주세요</Explanation>
      <InputWrapper>
        <Title>
          카테고리<span>*</span>
        </Title>
        <Select
          width="auto"
          placeholder="옵션"
          borderColor="white"
          focusBorderColor="pink.100"
          size="lg"
          _hover={{ borderColor: "pink.200" }}
          value={tagInfo.category}
          onChange={(e) => handleTagInfoChange("category", e.target.value)}
        >
          <option>123</option>
        </Select>
      </InputWrapper>
      <InputWrapper>
        <Title>
          가격<span>*</span>
        </Title>
        <Input
          focusBorderColor="pink.100"
          size="lg"
          placeholder="가격을 입력해주세요."
          value={tagInfo.price}
          onChange={(e) => handleTagInfoChange("price", e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Title>
          브랜드<span>*</span>
        </Title>
        <Input
          focusBorderColor="pink.100"
          size="lg"
          placeholder="브랜드명을 입력해주세요."
          value={tagInfo.productName}
          onChange={(e) => handleTagInfoChange("productName", e.target.value)}
        />
      </InputWrapper>
      <MakeTagButton onClick={handleAddTag}>
        MAKE TAG
        <Image src="/icon/tag.svg" alt="tag" />
      </MakeTagButton>
      <NextButton onClick={goToNextStep}>다음 단계</NextButton>
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
  span {
    color: var(--pink100);
  }
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
  padding: 7px 12px;
  margin-left: auto;
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: var(--pink100);
  color: black;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  padding: 7px 12px;
`;
