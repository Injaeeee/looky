import ArticleList from "../components/articleList";
import styled from "styled-components";
import { Avatar, Image } from "@chakra-ui/react";
import { SearchInput } from "../components/common/input";
import BestRanking from "../components/bestRanking";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { getArticles } from "../util/article.api";
import { Article, ArticleFilter } from "../types/article.types";
import { Link } from "react-router-dom";

export default function ListPage() {
  const { user } = useAuthStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<ArticleFilter>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchArticles = async () => {
    const result = await getArticles(filters, selectedCategories, searchTerm);
    setArticles(result);
  };

  useEffect(() => {
    fetchArticles();
  }, [filters, selectedCategories, searchTerm]);

  return (
    <Container>
      <Navigation>
        <UserWrapper>
          <Avatar name={user?.name} src={user?.imageUrl} />
          <UserInfo>
            <UserName>{user?.name}</UserName>
            <UserDetail>
              {user?.height} · {user?.mood}
            </UserDetail>
          </UserInfo>
        </UserWrapper>
        <SearchWrapper>
          <SearchTitle>검색</SearchTitle>
          <SearchInput onSearch={setSearchTerm} />
        </SearchWrapper>
        <RankingWrapper>
          <RankingTitle>
            <Image src="/icon/rankIcon.svg" alt="rank icon" />
            LOOKY BEST RANKING
          </RankingTitle>
          <BestRanking />
          <SeeMoreLink to="/ranking">SEE MORE {">"}</SeeMoreLink>
        </RankingWrapper>
      </Navigation>
      <ArticleList
        articles={articles}
        filters={filters}
        onCategoryChange={setSelectedCategories}
        onFiltersChange={setFilters}
      />
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

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 80px;
  border: 1px solid var(--gray700);
  padding: 10px;
  border-radius: 8px;
`;

const SearchTitle = styled.p`
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

const SeeMoreLink = styled(Link)`
  color: var(--gray500);
  align-self: flex-end;
  font-size: 10px;
  font-weight: 800;

  &:hover {
    color: var(--gray400);
  }
`;
