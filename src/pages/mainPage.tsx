import styled from "styled-components";
import { Image, useDisclosure } from "@chakra-ui/react";
import { BlurTag } from "../components/common/tag";
import MainRanking from "../components/mainRanking";
import { PinkBorderButton } from "../components/common/button";
import { Link } from "react-router-dom";
import CreateModal from "../components/createModal";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useIsMobile } from "../hooks/useIsMobile";

export default function MainPage() {
  const [selectedArticle, setSelectedArticle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuthStore();
  const isMobile = useIsMobile();

  const handleOpenModal = () => {
    setSelectedArticle(true);
    onOpen();
  };
  return (
    <Container>
      <FrontImage
        src="/image/main1.png"
        alt="background1"
        top={isMobile ? "40px" : "35px"}
        left="25%"
        boxSize={isMobile ? "100px" : undefined}
      />
      <BackgroundImage
        src="/image/main2.png"
        alt="background2"
        top={isMobile ? "160px" : "400px"}
        left="20%"
        boxSize={isMobile ? "100px" : undefined}
      />
      <BackgroundImage
        src="/image/main3.png"
        alt="background3"
        top={isMobile ? "270px" : "800px"}
        left="25%"
        boxSize={isMobile ? "100px" : undefined}
      />
      <Content>
        <MainContent>
          <MainWrapper>
            <MainIntro>
              LETS <br />
              FIND YOUR <br />
              TRUE <br />
              STYLE HERE
            </MainIntro>
            <ViewIntro>
              <Image
                src="/image/main.png"
                alt="main"
                height="500px"
                objectFit="contain"
                boxSize={isMobile ? "150px" : undefined}
              />
              {!isMobile && (
                <ViewPost>
                  <PinkLink to="/list">VIEW POST {">"}</PinkLink>
                </ViewPost>
              )}
            </ViewIntro>
          </MainWrapper>
          <LookyLabel>With Looky</LookyLabel>
        </MainContent>
        <ShareContent>
          <TitleWrapper>
            <MainTitle>LOOKY STYLE SHARE</MainTitle>
            <SubTitle>LOOKY와 함께 나만의 스타일을 공유해보세요</SubTitle>
          </TitleWrapper>
          <MainRanking />
        </ShareContent>
        <InfoContent>
          <InfoMessage>
            <InfoLabel>
              나만의 태그를 만들어 <br />
              자유롭게 사진에 태그해 보세요.
            </InfoLabel>
            {!isMobile && (
              <TagInfoWrapper>
                <TagInfoLabelWrapper>
                  <TagInfoLabel>필수정보 입력</TagInfoLabel>
                  <TagInfoSubLabel>(카테고리, 가격, 브랜드명)</TagInfoSubLabel>
                </TagInfoLabelWrapper>
                {">"}
                <Button>
                  MAKE TAG
                  <Image src="/icon/tag.svg" alt="tag" />
                </Button>
                {">"}
                <BlurTag
                  category="SHOES"
                  price={120000}
                  name="나이키 에어포스"
                />
                <BlurTag category="TOP" price={67000} name="KIIMMER" />
                <BlurTag category="ACC" price={100000} name="돌체 앤 가바나" />
                {">"}
              </TagInfoWrapper>
            )}
          </InfoMessage>
          <Image
            src="/image/info1.png"
            alt="info"
            height="500px"
            objectFit="contain"
            boxSize={isMobile ? "150px" : undefined}
          />
          {isAuthenticated && (
            <LeftButton onClick={() => handleOpenModal()}>
              <Image src="/icon/pinkCreate.svg" alt="create" />
              CREATE
            </LeftButton>
          )}
        </InfoContent>
        <InfoContent>
          <Image
            src="/image/info2.png"
            alt="info"
            height="500px"
            objectFit="contain"
            boxSize={isMobile ? "200px" : undefined}
          />
          <InfoLabel>
            스타일 게시물을 만들고 <br />
            다른 사람과 공유해보세요.
          </InfoLabel>
          <RightButton>
            <PinkLink to="/list">
              <Image src="/icon/article.svg" alt="article" />
              게시판 가기
            </PinkLink>
          </RightButton>
        </InfoContent>
      </Content>
      <Footer>
        <Image src="/image/logo.png" alt="logo" />
        <FooterLabel>
          주식회사 루키이사 : 정인재 | 정보 확인호스팅 | 제공자 : 주식회사 루키
          |
          <br /> EMAIL : qmffpdl0903@gmail.com
        </FooterLabel>
        <PlatformWrapper>
          <Image src="/icon/youtube.svg" alt="youtube" />
          <Image src="/icon/twitter.svg" alt="twitter" />
          <Image src="/icon/apple.svg" alt="apple" />
          <Image src="/icon/instagram.svg" alt="instagram" />
        </PlatformWrapper>
        <FooterPinkLabel>© 2025 LOOKY All rights reserved</FooterPinkLabel>
      </Footer>
      {selectedArticle && <CreateModal isOpen={isOpen} onClose={onClose} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FrontImage = styled(Image)`
  position: absolute;
  width: 300px;
  height: auto;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  height: auto;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 180px;
  margin: 0 auto 200px;
  
  @media (max-width: 768px) {
    gap: 30px;
    margin: 0 auto 80px;
  }
`;

const MainWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 100px;
  margin-top: 200px;
  
  @media (max-width: 768px) {
    margin-top: 100px;
    gap: 30px;
  }
`;

const ViewIntro = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainIntro = styled.p`
  font-size: 128px;
  line-height: 132px;
  font-weight: 800;
  color: var(--white10);

  @media (max-width: 1200px) {
    font-size: 80px;
    line-height: 80px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 38px;
  }
`;

const ViewPost = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: var(--pink100);
`;

const PinkLink = styled(Link)`
  color: var(--pink100);
  justify-content: center;
  display: flex;
  gap: 5px;
`;

const LookyLabel = styled.p`
  font-size: 40px;
  font-weight: 400;
  color: var(--pink100);
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const InfoContent = styled.div`
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    gap: 10px;
  }

`;

const InfoMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoLabel = styled.p`
  font-size: 40px;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const TagInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 30px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 10px;
    gap: 10px;
  }
`;

const TagInfoLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const TagInfoLabel = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const TagInfoSubLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.p`
  font-size: 28px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

const Button = styled(PinkBorderButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid var(--pink100);
  border-bottom: 1px solid var(--pink100);
  padding: 50px 0;
  gap: 25px;
`;

const FooterLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--gray500);
  border-bottom: 1px solid var(--gray500);
  padding-bottom: 25px;
`;

const PlatformWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterPinkLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--pink100);
`;

const LeftButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const RightButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
