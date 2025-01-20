import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Image, useDisclosure } from "@chakra-ui/react";
import CreateModal from "../createModal";
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../util/user.api";
import { PinkBorderButton } from "./button";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, restoreSession } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = () => {
    setSelectedArticle(true);
    onOpen();
  };

  if (isMobile) {
    return null;
  }

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Navigation>
        {isAuthenticated ? (
          <LeftWrapper>
            <UserWrapper to="/mypage">
              <Avatar name={user?.name} src={user?.imageUrl} />
              <UserName>{user?.name} </UserName>
            </UserWrapper>
            |<PinkBorderButton onClick={handleLogout}>Logout</PinkBorderButton>
          </LeftWrapper>
        ) : (
          <LeftWrapper>
            <Link to="/login">
              <PinkBorderButton>Login</PinkBorderButton>
            </Link>
            <RouterButton to="/signup">Sign Up</RouterButton>
          </LeftWrapper>
        )}
        <LogoWrapper to="/">
          <Image src="/image/logo.png" alt="logo" />
        </LogoWrapper>
        <RouterWrapper>
          {isAuthenticated && (
            <CreateButton onClick={() => handleOpenModal()}>
              <Image src="/icon/create.svg" alt="create" />
              CREATE
            </CreateButton>
          )}
          <RouterButton to="/list">
            <Image src="/icon/article.svg" alt="article" />
            게시물
          </RouterButton>
          <RouterButton to="/ranking">
            <Image src="/icon/ranking.svg" alt="ranking" />
            랭킹
          </RouterButton>
        </RouterWrapper>
      </Navigation>
      {selectedArticle && <CreateModal isOpen={isOpen} onClose={onClose} />}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-bottom: 1px solid var(--pink100);
  background: ${({ $isScrolled }) =>
    $isScrolled ? "var(--black10)" : "transparent"};
  z-index: 5;
`;

const Navigation = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;

  @media (max-width: 1248px) {
    padding: 0 24px;
  }
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const RouterWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const RouterButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--pink100);
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray100);
  background-color: var(--gray600);
  border-radius: 24px;
  padding: 8px 16px;
`;

const LogoWrapper = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
