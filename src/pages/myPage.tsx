import { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import MyArticles from "../components/myPage/myArticles";
import EditProfileModal from "../components/myPage/editProfileModal";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
export default function MyPage() {
  const [activeButton, setActiveButton] = useState<string>("내 게시물");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const handleOpenModal = () => {
    onOpen();
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <UserWrapper>
        <Avatar name={user?.name} src={user?.imageUrl} boxSize="104px" />
        <UserInfo>
          <UserName>{user?.name}</UserName>
          <EditButton onClick={() => handleOpenModal()}>
            edit profile
          </EditButton>
        </UserInfo>
      </UserWrapper>
      <ButtonWrapper>
        <Button
          $isActive={activeButton === "내 게시물"}
          onClick={() => handleButtonClick("내 게시물")}
        >
          내 게시물
        </Button>
        <Button
          $isActive={activeButton === "like"}
          onClick={() => handleButtonClick("like")}
        >
          like
        </Button>
      </ButtonWrapper>
      <MyArticles activeButton={activeButton} />
      {user && (
        <EditProfileModal isOpen={isOpen} onClose={onClose} user={user} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  align-items: center;
  margin: 150px auto 0;
  @media (max-width: 768px) {
    gap: 20px;
    margin: 100px auto 0;
  }
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

const Button = styled.button<{ $isActive: boolean }>`
  color: var(--gray600);
  font-size: 16px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 50px;
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--gray700)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "white" : "var(--gray600)")};

  &:hover {
    background-color: ${({ $isActive }) => !$isActive && "var(--gray700)"};
  }
`;
