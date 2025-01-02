import RankingList from "../components/rankingList";

import styled from "styled-components";

export default function RankingPage() {
  return (
    <Container>
      <RankingList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 150px auto 0;
`;
