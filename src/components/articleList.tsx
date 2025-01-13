import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Stack,
  Heading,
  Text,
  Avatar,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BlurTag, PinkBlurTag, PinkTag } from "../components/tag";
import ArticleModal from "../components/articleModal";
import CategoryList from "./category";
import SelectGroup from "./select";
import { getArticles } from "../util/article.api";
import { Article, Season, TPO, ArticleFilter } from "../types/article.types";
import { Gender, Height, Mood } from "../types/user.types";

export default function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState<ArticleFilter>({
    season: null,
    tpo: null,
    mood: null,
    gender: null,
    height: null,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectChange =
    (key: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setFilters((prev) => ({ ...prev, [key]: value }));
      console.log(`${key}: ${value}`);
    };

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    onOpen();
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles(filters);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [filters]);

  return (
    <Container>
      <CategoryList />
      <SelectGroup onSelectChange={handleSelectChange} />
      <ArticleListContainer>
        {articles.map((article, index) => (
          <ArticleContainer
            key={index}
            onClick={() => handleOpenModal(article)}
          >
            <CardImage src={article.imageURL} alt="Background Image" />
            <CardContent>
              <Stack spacing="1">
                <Header size="md" color="white">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  {article.title}
                </Header>
                <Text color="white">{article.title}</Text>
                <Stack direction="row" spacing="2">
                  {article.tags.map((tag, idx) => (
                    <PinkTag key={idx} label={tag.productName} />
                  ))}
                </Stack>
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
  gap: 10px;
  padding: 0 16px;
`;

const ArticleListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1200px;
  gap: 10px;
`;

const ArticleContainer = styled.div`
  position: relative;
  width: 265px;
  height: 330px;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
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
`;
