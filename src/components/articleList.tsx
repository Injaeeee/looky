import { useState } from "react";
import styled from "styled-components";
import { Stack, Heading, Text, Avatar, useDisclosure } from "@chakra-ui/react";
import { PinkTag } from "./common/tag";
import ArticleModal from "../components/articleModal";
import CategoryList from "./category";
import { SelectGroup } from "./common/select";
import { Article, ArticleFilter } from "../types/article.types";

export default function ArticleList({
  articles,
  filters,
  onCategoryChange,
  onFiltersChange,
}: {
  articles: Article[];
  filters: ArticleFilter;
  onCategoryChange: (categories: string[]) => void;
  onFiltersChange: (filters: ArticleFilter) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    onOpen();
  };

  return (
    <Container>
      <CategoryList onCategoryChange={onCategoryChange} />
      <SelectGroup
        onSelectChange={(key) => (event) => {
          const value = event.target.value;
          onFiltersChange({
            ...filters,
            [key]: value,
          });
        }}
      />
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
