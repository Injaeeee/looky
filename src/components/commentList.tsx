import { Avatar } from "@chakra-ui/react";
import styled from "styled-components";

interface CommentProps {
  id: number;
  userName: string;
  content: string;
  avatarSrc: string;
}

const comments = [
  {
    id: 1,
    userName: "Dan Abrahmov",
    content: "React is great!",
    avatarSrc: "https://bit.ly/dan-abramov",
  },
  {
    id: 2,
    userName: "Sarah Drasner",
    content: "Styled-components are amazing!",
    avatarSrc: "https://bit.ly/sarah-drasner",
  },
  {
    id: 3,
    userName: "Ryan Florence",
    content: "Let's build great UIs!",
    avatarSrc: "https://bit.ly/ryan-florence",
  },
  {
    id: 4,
    userName: "Kent C. Dodds",
    content: "Testing is essential.",
    avatarSrc: "https://bit.ly/kent-c-dodds",
  },
];
function Comment({ userName, content, avatarSrc }: CommentProps) {
  return (
    <CommentWrapper>
      <Avatar name={userName} src={avatarSrc} />
      <ContentWrapper>
        <UserName>{userName}</UserName>
        <Content>{content}</Content>
      </ContentWrapper>
    </CommentWrapper>
  );
}

export default function CommentList() {
  return (
    <CommentListWrapper>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          userName={comment.userName}
          content={comment.content}
          avatarSrc={comment.avatarSrc}
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
