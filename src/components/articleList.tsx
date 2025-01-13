import { useState } from "react";
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
import Select from "./select";

export default function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (title: string, description: string) => {
    setSelectedArticle({ title, description });
    onOpen();
  };

  const taskLists = [
    {
      title: "Living Room Sofa",
      description: "Perfect for modern tropical spaces",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
    {
      title: "Dining Table",
      description: "Elegant and durable",
      tags: ["Furniture", "Wood", "Stylish"],
    },
    {
      title: "Bed Frame",
      description: "Comfortable and sturdy",
      tags: ["Cozy", "Modern", "Affordable"],
    },
    {
      title: "Bed Frame",
      description: "Comfortable and sturdy",
      tags: ["Cozy", "Modern", "Affordable"],
    },
    {
      title: "Bed Frame",
      description: "Comfortable and sturdy",
      tags: ["Cozy", "Modern", "Affordable"],
    },
    {
      title: "Bed Frame",
      description: "Comfortable and sturdy",
      tags: ["Cozy", "Modern", "Affordable"],
    },
  ];

  return (
    <Container>
      <CategoryList />
      <Select />
      <ArticleListContainer>
        {taskLists.map((task, index) => (
          <ArticleContainer
            key={index}
            onClick={() => handleOpenModal(task.title, task.description)}
          >
            <CardImage
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Background Image"
            />
            <CardContent>
              <Stack spacing="1">
                <Header size="md" color="white">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  {task.title}
                </Header>
                <Text color="white">{task.description}</Text>
                <Stack direction="row" spacing="2">
                  {task.tags.map((tag, idx) => (
                    <PinkTag key={idx} label={tag} />
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
          title={selectedArticle.title}
          description={selectedArticle.description}
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
