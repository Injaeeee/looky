import styled from "styled-components";
import { Button, Stack, Heading, Text, Avatar } from "@chakra-ui/react";
import Tag from "../components/tag";
import Select from "./select";
import CategoryList from "./category";

function ArticleItem() {
  return (
    <ArticleContainer>
      <CardImage
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Background Image"
      />
      <CardContent>
        <Stack spacing="1">
          <Header size="md" color="white">
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            Living Room Sofa
          </Header>
          <Text color="white">
            This sofa is perfect for modern tropical spaces
          </Text>

          <Stack direction="row" spacing="2">
            <Tag label="Tag 1" />
            <Tag label="Tag 2" />
            <Tag label="Tag 3" />
          </Stack>
        </Stack>
      </CardContent>
    </ArticleContainer>
  );
}

export default function ArticleList() {
  const taskLists = [1, 2, 3, 4, 5];
  return (
    <Container>
      <CategoryList />
      <Select />
      <ArticleListContainer>
        {taskLists.map((taskList, index) => (
          <ArticleItem key={index} />
        ))}
      </ArticleListContainer>
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
