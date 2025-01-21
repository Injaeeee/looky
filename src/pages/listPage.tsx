import ArticleList from "../components/articleList";
import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";
import { SearchInput } from "../components/common/input";
import BestRanking from "../components/bestRanking";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { getArticles } from "../util/article.api";
import { Article, ArticleFilter } from "../types/article.types";
import { useArticleStore } from "../store/articleStore";
import { useIsTablet } from "../hooks/useIsMobile";

export default function ListPage() {
  const { user } = useAuthStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<ArticleFilter>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const ArticleId = useArticleStore((state) => state.ArticleId);
  const isTablet = useIsTablet();

  const fetchArticles = async () => {
    const result = await getArticles(filters, selectedCategories, searchTerm);
    setArticles(result);
  };

  useEffect(() => {
    fetchArticles();
  }, [filters, selectedCategories, searchTerm, ArticleId]);

  return (
    <Container>
      {!isTablet && (
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
          <BestRanking />
        </Navigation>
      )}

      <ArticleList
        articles={articles}
        filters={filters}
        onCategoryChange={setSelectedCategories}
        onFiltersChange={setFilters}
        setSearchTerm={setSearchTerm}
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
