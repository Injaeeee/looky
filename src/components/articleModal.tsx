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
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BlurTag, PinkBlurTag } from "./common/tag";
import CommentList from "./commentList";
import { Article } from "../types/article.types";
import { Icon } from "@chakra-ui/react";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { updateLikeCount } from "../util/article.api";
import { useAuthStore } from "../store/authStore";
import { updateUserLikeStatus } from "../util/user.api";
import { postComment } from "../util/comment.api";
import { Comment } from "../types/comment.types";
import { PinkBorderButton } from "./common/button";
import Dialog from "./common/dialog";
import { deleteArticle } from "../util/article.api";
import { useArticleStore } from "../store/articleStore";
import { useIsMobile } from "../hooks/useIsMobile";

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
  const { user, isAuthenticated } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>(article.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null!);
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const isMobile = useIsMobile();

  const handleDialogConfirm = async () => {
    await deleteArticle(article.id);
    useArticleStore.getState().setArticleId(article.id);
    setIsDialogOpen(false);
    onClose();
  };

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

  useEffect(() => {
    if (isOpen) {
      setComments(article.comments || []);
    }
  }, [isOpen, article.comments]);

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

    if (user) {
      const { uid } = user;
      await updateUserLikeStatus(uid, article.id, newLikedState);
      await updateLikeCount(article.id, incrementValue);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    if (!user) return;

    const newComment: Comment = {
      userUid: user.uid,
      userEmail: user.email,
      userImage: user.imageUrl,
      userName: user.name || "",
      createdAt: new Date().toISOString(),
      content: commentText,
    };

    await postComment(article.id, newComment);
    setComments((prevComments) => [newComment, ...prevComments]);
    setCommentText("");
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={isMobile ? "slideInBottom" : undefined}
      scrollBehavior={isMobile ? "inside" : undefined}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        width="auto"
        maxWidth="100%"
        bg="var(--gray900)"
        borderRadius="10px"
        position={isMobile ? "fixed" : undefined}
        bottom={0}
        overflow="hidden"
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
            <ImagePreview
              src={article.imageURL}
              boxSize={isMobile ? "350px" : undefined}
            />
            {article.tags.map((tag, i) => (
              <TagWrapper key={i} x={tag.coordinates.x} y={tag.coordinates.y}>
                <BlurTag
                  category={tag.category}
                  price={tag.price}
                  name={tag.productName}
                />
              </TagWrapper>
            ))}
          </PictureContainer>
          <ArticleContent>
            <UserWrapper>
              <UserSpec>
                <UserName>{article.writer?.name}</UserName>
                <UserDetail>
                  {article.writer?.gender} · {article.writer?.height}
                </UserDetail>
              </UserSpec>
              {article.writer?.uid === user?.uid && (
                <PinkBorderButton onClick={handleDialogOpen}>
                  삭제하기
                </PinkBorderButton>
              )}
            </UserWrapper>
            <UserInfo>
              <UserTitle>INFO</UserTitle>
              <Info>
                <p>#{article.season}</p>
                <p>#{article.mood}</p>
                <p>#{article.tpo}</p>
              </Info>
            </UserInfo>
            <UserInfo>{article.content}</UserInfo>
            <UserInfo>
              <UserTitle>TAG</UserTitle>
              <Stack direction="row" spacing="2" flexWrap="wrap">
                {article.tags
                  .filter((tag) => tag.productName)
                  .map((tag, idx) => (
                    <PinkBlurTag key={idx} label={tag.productName} />
                  ))}
              </Stack>
            </UserInfo>
            <Communication>
              {isAuthenticated ? (
                <LikeButton onClick={toggleLike} type="button">
                  <Icon
                    as={liked ? TiHeartFullOutline : TiHeartOutline}
                    w={10}
                    h={10}
                    color={"var(--pink400)"}
                  />
                  {likeCount}
                </LikeButton>
              ) : (
                <LikeWrapper>
                  <Icon
                    as={TiHeartFullOutline}
                    w={10}
                    h={10}
                    color={"var(--pink400)"}
                  />
                  {likeCount}
                </LikeWrapper>
              )}
            </Communication>
            <CommentListWrapper>
              {article.comments ? (
                <CommentList comments={comments} />
              ) : (
                <>댓글이 없습니다.</>
              )}
            </CommentListWrapper>
            {isAuthenticated && (
              <FixedInputWrapper>
                <InputGroup>
                  <CommentInput
                    focusBorderColor="pink.100"
                    size="lg"
                    variant="flushed"
                    placeholder="댓글을 입력해주세요."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ fontSize: "16px" }}
                  />
                  <InputRightElement>
                    <button onClick={handleAddComment}>
                      <Image src="/icon/message.svg" width="15px" />
                    </button>
                  </InputRightElement>
                </InputGroup>
              </FixedInputWrapper>
            )}
          </ArticleContent>
        </ArticleBody>
      </ModalContent>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        content="게시물을 삭제하시겠습니까?"
        leastDestructiveRef={cancelRef}
      />
    </Modal>
  );
}

const ArticleBody = styled(ModalBody)`
  display: flex;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 80px;
  }
`;

const PictureContainer = styled.div`
  min-width: 650px;
  min-height: 650px;
  position: relative;

  @media (max-width: 768px) {
    min-width: 350px;
    min-height: 350px;
  }
`;

const ImagePreview = styled(Image)`
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

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  gap: 5px;
`;

const Info = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 18px;
  border-bottom: 2px solid var(--gray700);
`;

const UserSpec = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 25px;
  font-weight: 800;
`;

const UserDetail = styled.p`
  font-size: 15px;
  color: var(--gray500);
  font-weight: 600;
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

const LikeWrapper = styled.div`
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

const TagWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${({ y }) => y}%;
  left: ${({ x }) => x}%;

  @media (max-width: 768px) {
    top: ${({ y }) => `${Math.min(Math.max(y, 0), 79)}%`};
    left: ${({ x }) => `${Math.min(Math.max(x, 0), 78)}%`};
  }
`;
