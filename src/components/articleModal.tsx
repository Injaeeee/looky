import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Stack,
  Image,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlurTag, PinkBlurTag } from "./tag";
import CommentList from "./commentList";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function ArticleModal({
  isOpen,
  onClose,
  title,
  description,
}: ArticleModalProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    console.log(liked);
  }, [liked]);

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
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <PictureContainer />
          <ArticleContent>
            <UserSpec>
              <UserName>@injae</UserName>
              <UserDetail>175cm 70kg</UserDetail>
            </UserSpec>
            <UserInfo>
              <UserTitle>INFO</UserTitle>#남 #겨울
            </UserInfo>
            <UserInfo>
              <UserTitle>Tag</UserTitle>
              <Stack direction="row" spacing="2" flexWrap="wrap">
                <PinkBlurTag label="SHOES" />
                <PinkBlurTag label="SHOES" />
                <PinkBlurTag label="SHOES" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
                <PinkBlurTag label="SHOES!!!!!!!!" />
              </Stack>
            </UserInfo>
            <Communication>
              <button onClick={toggleLike}>
                <Image src="/icon/like.svg" width="16px" />
                123
              </button>
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
  background-color: white;
`;

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
`;

const UserTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserSpec = styled.div`
  display: flex;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const UserDetail = styled.p`
  font-size: 14px;
  font-weight: 200;
`;

const Communication = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 20px;
  gap: 8px;
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
