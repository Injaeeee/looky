import { Avatar, Stack, Text, Heading, Image } from "@chakra-ui/react";
import styled from "styled-components";
export default function MainRanking() {
  const articles = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Kim",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Lee",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Park",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Choi",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Jung",
    },
  ];

  return (
    <MainContainer>
      <TopImage src="/icon/best.svg" alt="Best" />
      <Container>
        {articles.slice(0, 3).map((article, index) =>
          index === 0 ? (
            <BestArticle key={article.id}>
              <CardImage src={article.image} alt={`${article.name} Image`} />
              <CardContent>
                <Ranking>
                  <BestNumber>{index + 1} .</BestNumber>
                  <BestName>{article.name}</BestName>
                </Ranking>
                <CommentCount>
                  <Image src="/icon/comment.svg" alt="comment" />
                  123
                </CommentCount>
              </CardContent>
            </BestArticle>
          ) : index === articles.length - 1 ? (
            <SplitArticle key={article.id}>
              <HalfArticle>
                <CardImage
                  src={articles[3].image}
                  alt={`${articles[3].name} Image`}
                />
                <CardContent>
                  <Ranking>
                    <RankingNumber>{index + 1} .</RankingNumber>
                    <RankingName>{articles[3].name}</RankingName>
                  </Ranking>
                  <CommentCount>
                    <Image src="/icon/comment.svg" alt="comment" />
                  </CommentCount>
                </CardContent>
              </HalfArticle>
              <HalfArticle>
                <CardImage
                  src={articles[4]?.image || "/placeholder.jpg"}
                  alt={`${articles[4]?.name || "Placeholder"} Image`}
                />
                <CardContent>
                  <Ranking>
                    <RankingNumber>{index + 1} .</RankingNumber>
                    <RankingName>
                      {articles[4]?.name || "Placeholder"}
                    </RankingName>
                  </Ranking>
                  <CommentCount>
                    <Image src="/icon/comment.svg" alt="comment" />
                  </CommentCount>
                </CardContent>
              </HalfArticle>
            </SplitArticle>
          ) : (
            <Article key={article.id}>
              <CardImage src={article.image} alt={`${article.name} Image`} />
              <CardContent>
                <Ranking>
                  <RankingNumber>{index + 1} .</RankingNumber>
                  <RankingName>{article.name}</RankingName>
                </Ranking>
                <CommentCount>
                  <Image src="/icon/comment.svg" alt="comment" />
                  123
                </CommentCount>
              </CardContent>
            </Article>
          ),
        )}
        <SplitArticles>
          {articles.slice(3, 5).map((article, index) => (
            <HalfArticle key={article.id}>
              <CardImage src={article.image} alt={`${article.name} Image`} />
              <CardContent>
                <Ranking>
                  <RankingNumber>{index + 4} .</RankingNumber>
                  <RankingName>{article.name}</RankingName>
                </Ranking>
                <CommentCount>
                  <Image src="/icon/comment.svg" alt="comment" />
                  123
                </CommentCount>
              </CardContent>
            </HalfArticle>
          ))}
        </SplitArticles>
      </Container>
      <Button>
        <Image src="/icon/ranking.svg" alt="ranking" />
        랭킹 더 보기{" "}
      </Button>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
`;

const TopImage = styled(Image)`
  position: absolute;
  top: -30px;
  left: -30px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Article = styled.div`
  width: 305px;
  height: 355px;
  position: relative;
  border-radius: 4px;
`;

const SplitArticles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BestArticle = styled(Article)`
  border: 2px solid var(--pink100);
  border-radius: 7px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Ranking = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RankingNumber = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const BestNumber = styled(RankingNumber)`
  color: var(--pink100);
`;

const RankingName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const BestName = styled(RankingName)`
  color: var(--pink100);
`;

const CommentCount = styled.p`
  display: flex;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const SplitArticle = styled.div`
  display: flex;
  flex-direction: column;
  width: 305px;
  height: 355px;
  gap: 5px;
`;

const HalfArticle = styled.div`
  width: 305px;
  height: 175px;
  position: relative;
  border-radius: 4px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--pink100);
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: var(--pink100);
  padding: 7px 12px;
  margin-top: 20px;
  margin-left: auto;
`;
