import { Article } from "../types/article.types";
import { getRankingArticles } from "../util/article.api";
import { Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
    <RankingWrapper>
      <RankingTitle>
        <Image src="/icon/rankIcon.svg" alt="rank icon" />
        LOOKY BEST RANKING
      </RankingTitle>
      <RankListWrapper>
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
      </RankListWrapper>
      <SeeMoreLink to="/ranking">SEE MORE {">"}</SeeMoreLink>
    </RankingWrapper>
  );
}

const RankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 380px;
  border: 1px solid var(--gray700);
  padding: 24px;
  border-radius: 8px;
  justify-content: flex-start;
  gap: 20px;
  @media (max-width: 768px) {
    border: none;
    padding: 3px;
  }
`;

const RankListWrapper = styled.div`
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
  @media (max-width: 768px) {
    border-bottom: solid var(--gray500) 1px;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  @media (max-width: 768px) {
    width: 55px;
  }
`;

const RankerLike = styled.p<{ $isTopThree: boolean }>`
  font-size: 10px;
  font-weight: 200;
  color: ${({ $isTopThree }) =>
    $isTopThree ? "var(--pink100)" : "var(--gray300)"};
`;

const RankingTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 800;
  position: relative;

  @media (min-width: 768px) {
    padding-bottom: 10px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: dashed var(--pink100) 1px;
      width: 20%;
    }
  }
`;

const SeeMoreLink = styled(Link)`
  color: var(--gray500);
  align-self: flex-end;
  font-size: 10px;
  font-weight: 800;
  &:hover {
    color: var(--gray400);
  }
`;
