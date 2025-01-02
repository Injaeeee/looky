import { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";
import ArticleList from "../components/articleList";

export default function MyPage() {
  const [activeButton, setActiveButton] = useState<string>("shots");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <Container>
      <UserWrapper>
        <Avatar name="Oshigaki Kisame" src="" boxSize="104px" />
        <UserInfo>
          <UserName>@injae </UserName>
          <EditButton>edit profile</EditButton>
        </UserInfo>
      </UserWrapper>
      <ButtonWrapper>
        <Button
          isActive={activeButton === "shots"}
          onClick={() => handleButtonClick("shots")}
        >
          shots
        </Button>
        <Button
          isActive={activeButton === "collection"}
          onClick={() => handleButtonClick("collection")}
        >
          collection
        </Button>
        <Button
          isActive={activeButton === "like"}
          onClick={() => handleButtonClick("like")}
        >
          like
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;
  margin: 150px auto 0;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UserName = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const EditButton = styled.button`
  padding: 12px 20px;
  border: 1px solid var(--gray400);
  color: var(--gray400);
  border-radius: 50px;
  font-size: 16px;
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  display: flex;
  background-color: var(--gray800);
  border-radius: 50px;
  padding: 3px;
  gap: 5px;
`;

const Button = styled.button<{ isActive: boolean }>`
  color: var(--gray600);
  font-size: 16px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 50px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--gray700)" : "transparent"};
  color: ${({ isActive }) => (isActive ? "white" : "var(--gray600)")};

  &:hover {
    background-color: ${({ isActive }) => !isActive && "var(--gray700)"};
  }
`;
