import ArticleList from "../components/articleList";
import styled from "styled-components";
import { Avatar, Button, Card, Image, Text } from "@chakra-ui/react";
import { SearchInput } from "../components/common/input";
import BestRanking from "../components/bestRanking";

export default function ListPage() {
  return (
    <Container>
      <Navigation>
        <UserWrapper>
          <Avatar name="Oshigaki Kisame" src="" />
          <UserInfo>
            <UserName>@injae</UserName>
            <UserDetail>175cm 70kg post 12</UserDetail>
          </UserInfo>
        </UserWrapper>
        <ProductSearchWrapper>
          <ProductTitle>상품명</ProductTitle>
          <SearchInput />
        </ProductSearchWrapper>
        <RankingWrapper>
          <RankingTitle>
            <Image src="/icon/rankIcon.svg" alt="rank icon" />
            LOOKY BEST RANKING
          </RankingTitle>
          <BestRanking />
          <SeeMoreButton>SEE MORE {">"}</SeeMoreButton>
        </RankingWrapper>
      </Navigation>
      <ArticleList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 100px auto 0;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 270px;
  height: 64px;
  gap: 10px;
  @media (max-width: 1248px) {
    padding: 0 24px;
  }
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 80px;
  border: 1px solid var(--gray700);
  padding: 10px 15px;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const UserDetail = styled.p`
  font-size: 14px;
  font-weight: 200;
`;

const ProductSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 80px;
  border: 1px solid var(--gray700);
  padding: 10px;
  border-radius: 8px;
`;

const ProductTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const RankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 380px;
  border: 1px solid var(--gray700);
  padding: 24px;
  border-radius: 8px;
  justify-content: flex-start;
  gap: 20px;
`;

const RankingTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 800;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: dashed var(--pink100) 1px;
    width: 20%;
  }
`;

const SeeMoreButton = styled.button`
  color: var(--gray500);
  align-self: flex-end;
  font-size: 10px;
  font-weight: 800;

  &:hover {
    color: var(--gray400);
  }
`;
