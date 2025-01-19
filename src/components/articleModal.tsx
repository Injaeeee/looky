import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Image,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlurTag, PinkBlurTag } from "./common/tag";
import CommentList from "./commentList";
import { Article } from "../types/article.types";
import { Icon } from "@chakra-ui/react";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { updateLikeCount } from "../util/article.api";
import { useAuthStore } from "../store/authStore";
import { updateUserLikeStatus } from "../util/user.api";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
}

export default function ArticleModal({
  isOpen,
  onClose,
  article,
}: ArticleModalProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(article.likeCount);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user.articleLike) {
      const isLiked = user.articleLike.includes(article.id);
      setLiked(isLiked);
    }

    const savedLikeCount = localStorage.getItem(`likeCount-${article.id}`);
    if (savedLikeCount) {
      setLikeCount(JSON.parse(savedLikeCount));
    } else {
      setLikeCount(article.likeCount);
    }
  }, [article.id, article.likeCount, user]);

  const toggleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    const incrementValue = newLikedState ? 1 : -1;
    const updatedLikeCount = likeCount + incrementValue;
    setLikeCount(updatedLikeCount);

    localStorage.setItem(`liked-${article.id}`, JSON.stringify(newLikedState));
    localStorage.setItem(
      `likeCount-${article.id}`,
      JSON.stringify(updatedLikeCount),
    );

    try {
      if (user) {
        const { uid } = user;
        await updateUserLikeStatus(uid, article.id, newLikedState);
        await updateLikeCount(article.id, incrementValue);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        width="auto"
        maxWidth="100%"
        bg="var(--gray900)"
        borderRadius="10px"
      >
        <ModalHeader
          bg="var(--gray800)"
          textAlign="center"
          borderTopRadius="10px"
        >
          {article.title}
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <PictureContainer>
            <ImagePreview src={article.imageURL} />
            {article.tags.map((tag, i) => (
              <TagWrapper
                key={i}
                style={{ top: tag.coordinates.y, left: tag.coordinates.x }}
              >
                <BlurTag
                  category={tag.category}
                  price={tag.price}
                  name={tag.productName}
                />
              </TagWrapper>
            ))}
          </PictureContainer>
          <ArticleContent>
            <UserSpec>
              <UserName>{article.writer?.name}</UserName>
              <UserDetail>
                {article.writer?.gender}· {article.writer?.height}
              </UserDetail>
            </UserSpec>
            <UserInfo>
              <UserTitle>INFO</UserTitle> #{article.season} #{article.mood} #
              {article.tpo}
            </UserInfo>
            <UserInfo>
              <UserTitle>Tag</UserTitle>
              <Stack direction="row" spacing="2" flexWrap="wrap">
                {article.tags
                  .filter((tag) => tag.productName)
                  .map((tag, idx) => (
                    <PinkBlurTag key={idx} label={tag.productName} />
                  ))}
              </Stack>
            </UserInfo>
            <Communication>
              <LikeButton onClick={toggleLike}>
                <Icon
                  as={liked ? TiHeartFullOutline : TiHeartOutline}
                  w={10}
                  h={10}
                  color={"var(--pink400)"}
                />
                {likeCount}
              </LikeButton>
              <button>
                <Image src="/icon/bookMark.svg" width="16px" />
              </button>
            </Communication>
            <CommentListWrapper>
              <CommentList />
            </CommentListWrapper>
            <FixedInputWrapper>
              <InputGroup>
                <CommentInput
                  focusBorderColor="pink.100"
                  size="lg"
                  variant="flushed"
                  placeholder="댓글을 입력해주세요."
                />
                <InputRightElement>
                  <button>
                    <Image src="/icon/message.svg" width="15px" />
                  </button>
                </InputRightElement>
              </InputGroup>
            </FixedInputWrapper>
          </ArticleContent>
        </ArticleBody>
      </ModalContent>
    </Modal>
  );
}

const ArticleBody = styled(ModalBody)`
  display: flex;
  gap: 40px;
`;

const PictureContainer = styled.div`
  min-width: 650px;
  min-height: 650px;
  position: relative;
`;

const ImagePreview = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
`;

const UserTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 5px;
`;

const UserSpec = styled.div`
  display: flex;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const UserDetail = styled.p`
  font-size: 15px;
  color: var(--gray500);
  font-weight: 400;
`;

const Communication = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 20px;
  gap: 8px;
`;

const LikeButton = styled.button`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const CommentInput = styled(Input)`
  width: 100%;
`;

const CommentListWrapper = styled.div`
  flex-grow: 1;
  margin-bottom: 10px;
`;

const FixedInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-top: 1.5px solid var(--gray300);
  padding-top: 3px;
`;

const TagWrapper = styled.div`
  position: absolute;
`;
