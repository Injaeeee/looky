import { useState, useEffect } from "react";
import styled from "styled-components";
import { Stack, Heading, Text, Avatar, useDisclosure } from "@chakra-ui/react";
import { PinkTag } from "./common/tag";
import ArticleModal from "../components/articleModal";
import { getRankingArticles } from "../util/article.api";
import { Article } from "../types/article.types";

export default function RankingList() {
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [articles, setArticles] = useState<Article[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const fetchArticles = async () => {
    const result = await getRankingArticles();
    setArticles(result);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      <ArticleListContainer>
        <RankingInfo>
          <InfoTitle>
            <p> STYLE</p>
            <p>RANKING</p>
          </InfoTitle>
          <InfoLabel>
            <p> 지난 일주일동안 가장 많은 좋아요를</p>
            <p> 받은 게시물을 직접 확인해보세요</p>
          </InfoLabel>
        </RankingInfo>
        {articles.map((article, index) => (
          <ArticleContainer
            key={index}
            $isHighlighted={index < 3}
            onClick={() => handleOpenModal(article)}
          >
            {index < 3 && (
              <HighlightedWrapper>
                <HighlightedRank>{index + 1} </HighlightedRank>
                <HighlightedUser>
                  <Header size="md" color="white">
                    {article.title}
                  </Header>
                  {article.content.length > 10
                    ? `${article.content.slice(0, 10)}...`
                    : article.content}
                </HighlightedUser>
              </HighlightedWrapper>
            )}
            <CardImage src={article.imageURL} alt={article.title} />
            <CardContent>
              <Header size="md" color="white">
                <Avatar
                  name={article.writer?.name}
                  src={article.writer?.imageUrl}
                />
                {article.writer?.name}
              </Header>
              <Text color="white">{article.title}</Text>
              <Stack direction="row" spacing="2">
                {article.tags
                  .filter((tag) => tag.productName)
                  .map((tag, idx) => (
                    <PinkTag key={idx} label={tag.productName} />
                  ))}
              </Stack>
            </CardContent>
          </ArticleContainer>
        ))}
      </ArticleListContainer>

      {selectedArticle && (
        <ArticleModal
          isOpen={isOpen}
          onClose={onClose}
          article={selectedArticle}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 150px auto 0;
  @media (max-width: 768px) {
    margin: 100px auto 50px;
  }
`;

const RankingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border: solid 2px var(--gray900);
  border-radius: 5px;
  background: var(--black10);

  @media (max-width: 768px) {
    padding: 30px 0;
    gap: 10px;
  }
`;

const InfoTitle = styled.div`
  color: var(--pink100);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
  line-height: 48px;
`;

const InfoLabel = styled.div`
  color: var(--pink100);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
`;

const ArticleListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1200px;
  gap: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 65px;
  }
`;

const ArticleContainer = styled.div<{ $isHighlighted: boolean }>`
  position: relative;
  width: 265px;
  height: 330px;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) =>
    props.$isHighlighted ? "2px solid var(--pink100)" : "none"};

  @media (max-width: 1200px) {
    height: 230px;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Header = styled(Heading)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 1px;
    padding: 10px;
  }
`;

const HighlightedWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: absolute;
  top: -65px;
  width: 100%;
  font-size: 18px;
  color: var(--pink100);
  text-align: center;
`;

const HighlightedRank = styled.p`
  font-size: 48px;
  font-weight: 700;
  color: var(--pink100);
`;

const HighlightedUser = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 300;
  color: var(--gray500);
`;
