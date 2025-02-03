import RankingList from "../components/rankingList";
import styled from "styled-components";

export default function RankingPage() {
  return (
    <Container>
      <Overlay />
      <Content>
        <RankingList />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("/image/rankingFrame.webp");
  background-size: cover;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 5px;
  justify-content: center;
`;
