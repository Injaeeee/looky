import { Avatar } from "@chakra-ui/react";
import { Comment } from "../types/comment.types";
import styled from "styled-components";

interface CommentListProps {
  comments: Comment[];
}
interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <CommentWrapper>
      <Avatar name={comment.userName} src={comment.userImage} />
      <ContentWrapper>
        <UserName>{comment.userName}</UserName>
        <Content>{comment.content}</Content>
      </ContentWrapper>
    </CommentWrapper>
  );
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <CommentListWrapper>
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
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
