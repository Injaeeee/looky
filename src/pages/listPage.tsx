import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, CircularProgress } from "@chakra-ui/react";
import styled from "styled-components";
import { getArticles, filterArticles } from "../util/article.api";
import { Article, ArticleFilter } from "../types/article.types";
import { useAuthStore } from "../store/authStore";
import { useArticleStore } from "../store/articleStore";
import { useIsTablet } from "../hooks/useIsMobile";
import { QueryDocumentSnapshot } from "firebase/firestore";
import ArticleList from "../components/articleList";
import { SearchInput } from "../components/common/input";
import BestRanking from "../components/bestRanking";

export default function ListPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<ArticleFilter>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const ArticleId = useArticleStore((state) => state.ArticleId);
  const isTablet = useIsTablet();
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchArticles = useCallback(async () => {
    if (!hasMore || isLoading) return; // 중복 호출 방지
    setIsLoading(true); // 로딩 시작

    try {
      const { articles: fetchedArticles, lastDoc: newLastDoc } =
        await getArticles(filters, lastDoc);

      if (fetchedArticles.length > 0) {
        setArticles((prev) => [
          ...prev,
          ...filterArticles(fetchedArticles, selectedCategories, searchTerm),
        ]);
        setLastDoc(newLastDoc);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [filters, selectedCategories, searchTerm, lastDoc, hasMore, isLoading]);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchArticles();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchArticles, hasMore],
  );


  useEffect(() => {
    setArticles([]); // 필터가 변경될 때마다 초기화
    setLastDoc(undefined);
    setHasMore(true);
    fetchArticles();
  }, [filters, selectedCategories, searchTerm, ArticleId]);

  return (
    <>
      <Container>
        {!isTablet && (
          <Navigation>
            {isAuthenticated && (
              <UserWrapper>
                <Avatar name={user?.name} src={user?.imageUrl} />
                <UserInfo>
                  <UserName>{user?.name}</UserName>
                  <UserDetail>
                    {user?.height} · {user?.mood}
                  </UserDetail>
                </UserInfo>
              </UserWrapper>
            )}

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

      {hasMore && (
        <Loading ref={lastArticleRef}>
          <CircularProgress isIndeterminate color="pink.300" />
        </Loading>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
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
  gap: 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid var(--gray700);
  padding: 10px;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 16px;
`;

const UserDetail = styled.p`
  font-size: 14px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  border: 1px solid var(--gray700);
  padding: 10px;
  border-radius: 8px;
`;

const SearchTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const Loading = styled.div`
  position: relative;
  margin: 20px auto;
  display: flex;
  justify-content: center;
`;

