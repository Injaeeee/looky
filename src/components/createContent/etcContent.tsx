import { Input, Select, Textarea } from "@chakra-ui/react";
import styled from "styled-components";
import { Season, TPO } from "../../types/article.types";
import { Mood } from "../../types/user.types";
import { PinkBorderButton, PinkButton } from "../common/button";
import { useAuthStore } from "../../store/authStore";

export default function EtcContent({
  goToPreviousStep,
  articleInfo,
  handleArticleInfoChange,
  register,
}: {
  goToPreviousStep: () => void;
  articleInfo: {
    title: string;
    mood: Mood;
    tpo: TPO;
    season: Season;
    content: string;
  };
  handleArticleInfoChange: (
    field: keyof typeof articleInfo,
    value: string,
  ) => void;
  register: any;
}) {
  const { user } = useAuthStore();
  return (
    <ArticleContent>
      <UserSpec>
        <UserName>{user?.name}</UserName>
        <UserDetail>
          #{user?.gender} #{user?.height}
        </UserDetail>
      </UserSpec>
      <InputWrapper>
        <Title>
          제목<span>*</span>
        </Title>
        <Input
          focusBorderColor="pink.100"
          size="lg"
          placeholder="제목을 입력해주세요."
          value={articleInfo.title}
          {...register("title")}
          onChange={(e) => handleArticleInfoChange("title", e.target.value)}
          style={{ fontSize: "17px" }}
        />
      </InputWrapper>
      <SelectWrapper>
        <InputWrapper>
          <Title>계절</Title>
          <Select
            borderColor="white"
            focusBorderColor="pink.100"
            size="lg"
            _hover={{ borderColor: "pink.200" }}
            value={articleInfo.season}
            onChange={(e) => handleArticleInfoChange("season", e.target.value)}
            style={{ fontSize: "17px" }}
          >
            {Object.values(Season).map((Season) => (
              <option key={Season} value={Season}>
                {Season}
              </option>
            ))}
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Title>TPO</Title>
          <Select
            borderColor="white"
            focusBorderColor="pink.100"
            size="lg"
            _hover={{ borderColor: "pink.200" }}
            value={articleInfo.tpo}
            onChange={(e) => handleArticleInfoChange("tpo", e.target.value)}
            style={{ fontSize: "17px" }}
          >
            {Object.values(TPO).map((TPO) => (
              <option key={TPO} value={TPO}>
                {TPO}
              </option>
            ))}
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Title>MOOD</Title>
          <Select
            borderColor="white"
            focusBorderColor="pink.100"
            size="lg"
            _hover={{ borderColor: "pink.200" }}
            value={articleInfo.mood}
            onChange={(e) => handleArticleInfoChange("mood", e.target.value)}
            style={{ fontSize: "17px" }}
          >
            {Object.values(Mood).map((Mood) => (
              <option key={Mood} value={Mood}>
                {Mood}
              </option>
            ))}
          </Select>
        </InputWrapper>
      </SelectWrapper>
      <InputWrapper>
        <Title>소개</Title>
        <Textarea
          focusBorderColor="pink.100"
          size="lg"
          placeholder="소개글을 입력해주세요."
          rows={5}
          value={articleInfo.content}
          {...register("content")}
          onChange={(e) => handleArticleInfoChange("content", e.target.value)}
          style={{ fontSize: "17px" }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <PinkBorderButton onClick={goToPreviousStep}>이전으로</PinkBorderButton>
        <PinkButton type="submit">공유하기</PinkButton>
      </ButtonWrapper>
    </ArticleContent>
  );
}

const ArticleContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 310px;
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
  gap: 10px;
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  margin-bottom: 15px;
  @media (min-width: 768px) {
    margin-bottom: 0;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
