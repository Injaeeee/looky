import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Image,
  Input,
  InputRightElement,
  InputGroup,
  Avatar,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
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
          프로필 수정
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <ArticleContent>
            <UserSpec>
              <Avatar name="Oshigaki Kisame" src="" boxSize="40px" />
              <BlackButton>upload new picture</BlackButton>
              <WhiteButton>delete</WhiteButton>
            </UserSpec>
            <InputWrapper>
              <Title>
                이름<span>*</span>
              </Title>
              <Input
                focusBorderColor="pink.100"
                size="lg"
                placeholder="이름을 입력해주세요."
              />
            </InputWrapper>
            <InputWrapper>
              <Title>
                나이<span>*</span>
              </Title>
              <Input
                focusBorderColor="pink.100"
                size="lg"
                placeholder="나이를 입력해주세요."
              />
            </InputWrapper>
            <InputWrapper>
              <Title>
                키<span>*</span>
              </Title>
              <Input
                focusBorderColor="pink.100"
                size="lg"
                placeholder="키를 입력해주세요."
              />
            </InputWrapper>
            <InputWrapper>
              <Title>
                성별<span>*</span>
              </Title>
              <Select
                width="auto"
                placeholder="남"
                borderColor="white"
                focusBorderColor="pink.100"
                size="lg"
                _hover={{ borderColor: "pink.200" }}
              >
                <option>여</option>
              </Select>
            </InputWrapper>
            <Button>저장하기</Button>
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

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 400px;
  padding: 30px;
`;

const UserSpec = styled.div`
  display: flex;
  height: 40px;
  gap: 10px;
  align-items: center;
`;

const BlackButton = styled.button`
  padding: 12px 20px;
  border: 1px solid var(--gray400);
  color: var(--gray400);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 400;
`;

const WhiteButton = styled.button`
  padding: 12px 20px;
  background: var(--gray400);
  color: var(--gray900);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 400;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: var(--pink100);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
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
  width: 100%;
  padding: 7px 12px;
`;
