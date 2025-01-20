import { Article } from "../types/article.types";
import { getRankingArticles } from "../util/article.api";
import { Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface RankType {
  id: number;
  rank: number;
  nickname: string;
  avatarSrc: string;
  likes: number;
}

function Rank({ rank, nickname, avatarSrc, likes }: RankType) {
  const isTopThree = rank <= 3;

  return (
    <RankContainer>
      <RankingNumber $isTopThree={isTopThree}>{rank}.</RankingNumber>
      <RankerWrapper>
        <Avatar name={nickname} src={avatarSrc} size="sm" />
        <RankerNickName $isTopThree={isTopThree}>{nickname}</RankerNickName>
      </RankerWrapper>
      <RankerLike $isTopThree={isTopThree}>Like {likes}</RankerLike>
    </RankContainer>
  );
}

export default function BestRanking() {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const result = await getRankingArticles();
    setArticles(result);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <RankListContainer>
      {articles.slice(0, 5).map((article, index) => (
        <Rank
          key={article.id}
          id={index}
          rank={index + 1}
          nickname={article.writer?.name || ""}
          avatarSrc={article.imageURL || ""}
          likes={article.likeCount}
        />
      ))}
    </RankListContainer>
  );
}

const RankListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin: 10px auto 0;
`;

const RankerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RankContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 5px;
  align-items: center;
  border-bottom: solid var(--gray500) 2px;
`;

const RankingNumber = styled.p<{ $isTopThree: boolean }>`
  font-size: 14px;
  font-weight: 900;
  color: ${({ $isTopThree }) =>
    $isTopThree ? "var(--pink100)" : "var(--gray500)"};
`;

const RankerNickName = styled.p<{ $isTopThree: boolean }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ $isTopThree }) =>
    $isTopThree ? "var(--pink100)" : "var(--gray300)"};
`;

const RankerLike = styled.p<{ $isTopThree: boolean }>`
  font-size: 10px;
  font-weight: 200;
  color: ${({ $isTopThree }) =>
    $isTopThree ? "var(--pink100)" : "var(--gray300)"};
`;
