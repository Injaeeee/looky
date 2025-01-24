import { Avatar } from "@chakra-ui/react";
import { Comment } from "../types/comment.types";
import styled from "styled-components";
import { deleteComment } from "../util/comment.api";
import { Article } from "../types/article.types";
import { PinkBorderButton } from "./common/button";
import { useAuthStore } from "../store/authStore";

interface CommentListProps {
  comments: Comment[];
  article: Article;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}
interface CommentItemProps {
  comment: Comment;
  article: Article;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentItem({ comment, article, setComments }: CommentItemProps) {
  const { user } = useAuthStore();

  async function handleDeleteComment() {
    await deleteComment(article.id, comment);
    setComments((prevComments) => prevComments.filter((c) => c !== comment));
  }

  return (
    <CommentWrapper>
      <Avatar name={comment.userName} src={comment.userImage} />
      <ContentWrapper>
        <UserName>{comment.userName}</UserName>
        <Content>{comment.content}</Content>
        {user?.uid === comment.userUid && (
          <DeleteButton onClick={handleDeleteComment}>삭제</DeleteButton>
        )}
      </ContentWrapper>
    </CommentWrapper>
  );
}

export default function CommentList({
  comments,
  article,
  setComments,
}: CommentListProps) {
  return (
    <CommentListWrapper>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          comment={comment}
          article={article}
          setComments={setComments}
        />
      ))}
    </CommentListWrapper>
  );
}

const CommentListWrapper = styled.div`
  overflow-y: auto;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--gray400);
`;

const Content = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: var(--gray400);
`;

const DeleteButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  color: var(--pink400);
  text-align: left;
`;
