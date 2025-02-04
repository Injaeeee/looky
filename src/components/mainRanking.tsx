import { Image, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Article } from "../types/article.types";
import styled from "styled-components";
import { getRankingArticles } from "../util/article.api";
import { Link } from "react-router-dom";
import ArticleModal from "./articleModal";

export default function MainRanking() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const fetchArticles = async () => {
    try {
      const result = await getRankingArticles();
      setArticles(result || []);
    } catch (error) {
      console.error("Failed to fetch ranking articles:", error);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <MainContainer>
      <TopImage src="/icon/best.svg" alt="Best" />
      <Container>
        {articles.slice(0, 3).map((article, index) =>
          index === 0 ? (
            <BestArticle
              key={article.id}
              onClick={() => handleOpenModal(article)}
            >
              <CardImage
                src={article.imageURL || "/placeholder.png"}
                alt={`${article.title} Image`}
              />
              <CardContent>
                <Ranking>
                  <BestNumber>{index + 1} .</BestNumber>
                  <BestName>{article.writer?.name || "익명"}</BestName>
                </Ranking>
                <CommentCount>
                  <Image src="/icon/comment.svg" alt="comment" />
                  {article.comments?.length || 0}
                </CommentCount>
              </CardContent>
            </BestArticle>
          ) : (
            <ArticleItem
              key={article.id}
              onClick={() => handleOpenModal(article)}
            >
              <CardImage
                src={article.imageURL || "/placeholder.png"}
                alt={`${article.title} Image`}
              />
              <CardContent>
                <Ranking>
                  <RankingNumber>{index + 1} .</RankingNumber>
                  <RankingName>{article.writer?.name || "익명"}</RankingName>
                </Ranking>
                <CommentCount>
                  <Image src="/icon/comment.svg" alt="comment" />
                  {article.comments?.length || 0}
                </CommentCount>
              </CardContent>
            </ArticleItem>
          ),
        )}
        {articles.length > 3 && (
          <SplitArticles>
            {articles.slice(3, 5).map((article, index) => (
              <HalfArticle
                key={article.id}
                onClick={() => handleOpenModal(article)}
              >
                <CardImage
                  src={article.imageURL || "/placeholder.png"}
                  alt={`${article.title} Image`}
                />
                <CardContent>
                  <Ranking>
                    <RankingNumber>{index + 4} .</RankingNumber>
                    <RankingName>{article.writer?.name || ""}</RankingName>
                  </Ranking>
                  <CommentCount>
                    <Image src="/icon/comment.svg" alt="comment" />
                    {article.comments?.length || 0}
                  </CommentCount>
                </CardContent>
              </HalfArticle>
            ))}
          </SplitArticles>
        )}
      </Container>
      <Link to="/ranking">
        <Button>
          <Image src="/icon/ranking.svg" alt="ranking" />
          랭킹 더 보기
        </Button>
      </Link>
      {selectedArticle && (
        <ArticleModal
          isOpen={isOpen}
          onClose={onClose}
          article={selectedArticle}
        />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
`;

const TopImage = styled(Image)`
  position: absolute;
  top: -30px;
  left: -30px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ArticleItem = styled.div`
  width: 305px;
  height: 355px;
  position: relative;
  border-radius: 4px;

  @media (max-width: 1200px) {
    width: 180px;
    height: 230px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 200px;
  }
`;

const SplitArticles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BestArticle = styled(ArticleItem)`
  border: 2px solid var(--pink100);
  border-radius: 7px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Ranking = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RankingNumber = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const BestNumber = styled(RankingNumber)`
  color: var(--pink100);
`;

const RankingName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const BestName = styled(RankingName)`
  color: var(--pink100);
`;

const CommentCount = styled.p`
  display: flex;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 1200px) {
    height: 30px;
  }
`;

const HalfArticle = styled.div`
  width: 305px;
  height: 175px;
  position: relative;
  border-radius: 4px;

  @media (max-width: 1200px) {
    width: 180px;
    height: 110px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 95px;
  }
`;

const Button = styled.button`
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
  margin-top: 20px;
  margin-left: auto;
`;
