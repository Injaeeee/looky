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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlurTag, PinkBlurTag } from "./tag";
import CommentList from "./commentList";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TagContent from "./createContent/tagContent";
import EtcContent from "./createContent/etcContent";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose }: ArticleModalProps) {
  const [liked, setLiked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계 상태

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1); // 다음 단계로 이동
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // 이전 단계로 이동
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

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
          게시물
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <PictureContainer>
            <Image src="/image/picture.png" alt="picture" />
            <PictureButton>사진 선택</PictureButton>
          </PictureContainer>
          {currentStep === 1 && <TagContent goToNextStep={goToNextStep} />}
          {currentStep === 2 && (
            <EtcContent goToPreviousStep={goToPreviousStep} />
          )}
        </ArticleBody>
      </ModalContent>
    </Modal>
  );
}

const ArticleBody = styled(ModalBody)`
  display: flex;
  gap: 20px;
`;

const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 650px;
  min-height: 650px;
  border: var(--gray600) dashed 3px;
`;

const PictureButton = styled.button`
  background-color: var(--pink100);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  padding: 7px 12px;
`;

const ArticleContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
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
`;

const Explanation = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: var(--pink100);
`;

const MakeTagButton = styled.button`
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
  width: 105px;
  height: 32px;
  margin-left: auto;
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: var(--pink100);
  color: black;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  padding: 7px 12px;
`;
