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

export default function RankingList() {
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
        {taskLists.map((task, index) => (
          <ArticleContainer
            key={index}
            $isHighlighted={index < 3}
            onClick={() => handleOpenModal(task.title, task.description)}
          >
            {index < 3 && (
              <HighlightedWrapper>
                <HighlightedRank>{index + 1} </HighlightedRank>
                <HighlightedUser>
                  <Header size="md" color="white">
                    {task.title}
                  </Header>
                  {task.description}
                </HighlightedUser>
              </HighlightedWrapper>
            )}
            <CardImage
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Background Image"
            />
            <CardContent>
              <Header size="md" color="white">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                {task.title}
              </Header>
              <Text color="white">{task.description}</Text>
              <Stack direction="row" spacing="2">
                {task.tags.map((tag, idx) => (
                  <PinkTag key={idx} label={tag} />
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
  gap: 48px;
  margin: 150px auto 0;
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
`;

const ArticleContainer = styled.div<{ $isHighlighted: boolean }>`
  position: relative;
  width: 265px;
  height: 330px;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) =>
    props.$isHighlighted ? "2px solid var(--pink100)" : "none"};
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
