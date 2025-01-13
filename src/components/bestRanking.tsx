import { Avatar } from "@chakra-ui/react";
import styled from "styled-components";

interface RankType {
  id: number;
  rank: number;
  nickname: string;
  avatarSrc: string;
  likes: number;
}

const ranks: RankType[] = [
  {
    id: 1,
    rank: 1,
    nickname: "@injae",
    avatarSrc: "https://bit.ly/dan-abramov", // 실제 URL로 변경
    likes: 100,
  },
  {
    id: 2,
    rank: 2,
    nickname: "@user2",
    avatarSrc: "https://bit.ly/dan-abramov", // 실제 URL로 변경
    likes: 90,
  },
  {
    id: 3,
    rank: 3,
    nickname: "@user3",
    avatarSrc: "https://bit.ly/dan-abramov", // 실제 URL로 변경
    likes: 80,
  },
  {
    id: 4,
    rank: 4,
    nickname: "@user4",
    avatarSrc: "https://bit.ly/dan-abramov", // 실제 URL로 변경
    likes: 70,
  },
  {
    id: 5,
    rank: 5,
    nickname: "@user5",
    avatarSrc: "https://bit.ly/dan-abramov", // 실제 URL로 변경
    likes: 60,
  },
];

function Rank({
  rank,
  nickname,
  avatarSrc,
  likes,
  isLast,
}: RankType & { isLast: boolean }) {
  const isTopThree = rank <= 3;

  return (
    <RankContainer $isLast={isLast}>
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
  return (
    <RankListContainer>
      {ranks.map((rank, index) => (
        <Rank
          key={rank.id}
          id={rank.id}
          rank={rank.rank}
          nickname={rank.nickname}
          avatarSrc={rank.avatarSrc}
          likes={rank.likes}
          isLast={index === ranks.length - 1}
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

const RankContainer = styled.div<{ $isLast: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 5px;
  align-items: center;
  border-bottom: solid var(--gray500) 2px;
  ${({ $isLast }) => $isLast && "border-bottom: none;"}
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
