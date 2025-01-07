import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BlurTag, PinkBlurTag } from "./tag";
import TagContent from "./createContent/tagContent";
import EtcContent from "./createContent/etcContent";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tag } from "@/types/tag.types";
import { Category } from "../types/tag.types";
import { Season, TPO } from "../types/article.types";
import { Mood } from "../types/user.types";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose }: ArticleModalProps) {
  const [liked, setLiked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInfo, setTagInfo] = useState({
    category: Category.OUTER,
    price: 0,
    productName: "",
  });

  const [articleInfo, setArticleInfo] = useState({
    title: "",
    tpo: TPO.바다,
    mood: Mood.미니멀,
    season: Season.Spring,
    intro: "",
  });

  const handleArticleInfoChange = (
    field: keyof typeof articleInfo,
    value: string,
  ) => {
    setArticleInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleTagInfoChange = (field: keyof typeof tagInfo, value: string) => {
    setTagInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const handleShare = () => {
    console.log(articleInfo, tags);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const handleAddTag = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const randomX = Math.min(Math.random() * rect.width, rect.width - 100);
      const randomY = Math.min(Math.random() * rect.height, rect.width - 100);
      const newTag: Tag = {
        id: Date.now(),
        category: tagInfo.category,
        price: tagInfo.price,
        productName: tagInfo.productName,
        coordinates: { x: randomX, y: randomY },
      };
      setTags((prevTags) => [...prevTags, newTag]);
      setTagInfo({ category: Category.OUTER, price: 0, productName: "" });
    }
  };

  const handleMoveTag = (id: number, x: number, y: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const adjustedX = Math.min(Math.max(x - rect.left, 0), rect.width - 100);
      const adjustedY = Math.min(Math.max(y - rect.top, 0), rect.height - 30);

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.id === id
            ? { ...tag, coordinates: { x: adjustedX, y: adjustedY } }
            : tag,
        ),
      );
    }
  };

  const handleDeleteTag = (id: number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
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
          게시물
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <DndProvider backend={HTML5Backend}>
            <PictureContainer ref={containerRef}>
              {imageSrc ? (
                <>
                  <ImagePreview src={imageSrc} alt="Selected" />
                  <DeleteButton onClick={() => setImageSrc(null)}>
                    삭제
                  </DeleteButton>
                </>
              ) : (
                <>
                  <Image src="/image/picture.png" alt="picture" />
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <PictureButton
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    사진 선택
                  </PictureButton>
                </>
              )}
              {tags.map((tag) => (
                <DraggableTag
                  key={tag.id}
                  tag={tag}
                  onMoveTag={handleMoveTag}
                  onDeleteTag={handleDeleteTag}
                />
              ))}
            </PictureContainer>
          </DndProvider>
          {currentStep === 1 && (
            <TagContent
              goToNextStep={goToNextStep}
              handleAddTag={handleAddTag}
              tagInfo={tagInfo}
              handleTagInfoChange={handleTagInfoChange}
            />
          )}
          {currentStep === 2 && (
            <EtcContent
              goToPreviousStep={goToPreviousStep}
              articleInfo={articleInfo}
              handleArticleInfoChange={handleArticleInfoChange}
              onShare={handleShare}
            />
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
  position: relative;
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

const ImagePreview = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const DraggableTag: React.FC<{
  tag: Tag;
  onMoveTag: (id: number, x: number, y: number) => void;
  onDeleteTag: (id: number) => void;
}> = ({ tag, onMoveTag, onDeleteTag }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drag] = useDrag(() => ({
    type: "TAG",
    item: { id: tag.id },
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onMoveTag(tag.id, offset.x, offset.y);
      }
    },
  }));

  drag(ref);

  return (
    <TagWrapper
      ref={ref}
      style={{ top: tag.coordinates.y, left: tag.coordinates.x }}
    >
      <BlurTag
        category={tag.category}
        price={tag.price}
        name={tag.productName}
        onDelete={() => onDeleteTag(tag.id)}
      />
    </TagWrapper>
  );
};

const TagWrapper = styled.div`
  position: absolute;
  cursor: move;
`;
