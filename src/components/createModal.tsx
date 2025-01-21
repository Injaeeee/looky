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
import { BlurTag } from "./common/tag";
import TagContent from "./createContent/tagContent";
import EtcContent from "./createContent/etcContent";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tag } from "../types/tag.types";
import { Category } from "../types/tag.types";
import { PostArticle, ArticleInfo, Season, TPO } from "../types/article.types";
import { Mood } from "../types/user.types";
import { uploadImage } from "../util/image.api";
import { postArticle } from "../util/article.api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PinkButton } from "./common/button";
import { useAuthStore } from "../store/authStore";
import { useArticleStore } from "../store/articleStore";
import { useIsMobile } from "../hooks/useIsMobile";
import { showToast } from "../components/common/toast";

const articleSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(10, "제목은 최대 10자 이하로 입력해주세요."),
  content: z.string().max(5, "소개글은 최대 30자 이하로 입력해주세요."),
});

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose }: ArticleModalProps) {
  const { handleSubmit, register, setValue } = useForm<PostArticle>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: Mood.미니멀,
      tpo: TPO.바다,
      season: Season.Spring,
      tags: [],
      imageURL: "",
    },
  });

  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInfo, setTagInfo] = useState({
    category: Category.OUTER,
    price: 0,
    productName: "",
  });

  const { user } = useAuthStore();
  const { accessToken, refreshToken, ...writer } = user!;

  const [articleInfo, setArticleInfo] = useState<ArticleInfo>({
    title: "",
    tpo: TPO.바다,
    mood: Mood.미니멀,
    season: Season.Spring,
    content: "",
    writer: writer,
    comments: [],
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

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      showToast({
        title: "이미지 파일만 업로드 가능합니다.",
        status: "error",
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast({
        title: "파일 크기는 5MB 이하로 업로드해야 합니다.",
        status: "error",
      });
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
    setFile(file);
  };

  const handleShare = async () => {
    const createdAt = new Date().toISOString();

    if (!file) {
      showToast({
        title: "이미지를 업로드해주세요.",
        status: "error",
      });
      return;
    }

    const imageURL = await uploadImage(file);

    const newArticle: PostArticle = {
      ...articleInfo,
      tags,
      createdAt,
      imageURL,
      updatedAt: new Date().toISOString(),
      likeCount: 0,
    };

    postArticle(newArticle)
      .then((articleId) => {
        setArticleInfo({
          title: "",
          content: "",
          mood: Mood.미니멀,
          tpo: TPO.바다,
          season: Season.Spring,
          writer: user,
          comments: [],
        });
        setValue("title", "");
        setTags([]);
        setFile(null);
        setImageSrc(null);
        onClose();
        useArticleStore.getState().setArticleId(articleId || "");
      })
      .catch((error: any) => {
        console.error("게시물 공유 중 오류 발생:", error);
      });
  };

  const handleError = (errors: any) => {
    const errorMessages = Object.values(errors)
      .map((error: any) => error.message)
      .join("\n");

    showToast({
      title: errorMessages,
      status: "error",
    });
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const handleAddTag = () => {
    if (containerRef.current) {
      const randomX = Math.random() * 70 + 10;
      const randomY = Math.random() * 70 + 10;
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
      const adjustedX = Math.min(Math.max(x - rect.left, 0), rect.width - 70);
      const adjustedY = Math.min(Math.max(y - rect.top, 0), rect.height - 60);
      const percentageX = (adjustedX / rect.width) * 100;
      const percentageY = (adjustedY / rect.height) * 100;

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.id === id
            ? { ...tag, coordinates: { x: percentageX, y: percentageY } }
            : tag,
        ),
      );
    }
  };

  const handleDeleteTag = (id: number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={isMobile ? "slideInBottom" : undefined}
      scrollBehavior={isMobile ? "inside" : undefined}
    >
      <form onSubmit={handleSubmit(handleShare, handleError)}>
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
            게시물
          </ModalHeader>
          <ModalCloseButton />
          <ArticleBody padding="20px">
            <DndProvider backend={HTML5Backend}>
              <PictureContainer ref={containerRef}>
                {imageSrc ? (
                  <>
                    <ImagePreview
                      src={imageSrc}
                      alt="Selected"
                      boxSize={isMobile ? "350px" : "650px"}
                    />
                    <DeleteButton
                      onClick={() => {
                        setImageSrc(null);
                        setFile(null);
                      }}
                    >
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
                    <PinkButton
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                      type="button"
                      color="white"
                    >
                      사진 선택
                    </PinkButton>
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
                tagCount={tags.length}
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
                register={register}
              />
            )}
          </ArticleBody>
        </ModalContent>
      </form>
    </Modal>
  );
}

const ArticleBody = styled(ModalBody)`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
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

  @media (max-width: 768px) {
    min-width: 350px;
    min-height: 350px;
  }
`;

const ImagePreview = styled(Image)`
  position: absolute;
  border-radius: 6px;
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  const isMobile = useIsMobile(); // 모바일 여부 확인

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TAG",
    item: { id: tag.id },
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onMoveTag(tag.id, offset.x, offset.y);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // 모바일에서 touch 이벤트로 드래그 동작 처리
  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const offsetX = touch.clientX;
    const offsetY = touch.clientY;
    onMoveTag(tag.id, offsetX, offsetY);
  };

  // 모바일에서 터치 이벤트가 있을 때, 드래그 처리
  useEffect(() => {
    if (isMobile && ref.current) {
      const element = ref.current;
      element.addEventListener("touchmove", handleTouchMove as EventListener);

      return () => {
        element.removeEventListener(
          "touchmove",
          handleTouchMove as EventListener,
        );
      };
    }
  }, [isMobile]);

  // 드래그 이벤트 연결
  drag(ref);

  return (
    <TagWrapper
      ref={ref}
      style={{
        top: `${tag.coordinates.y}%`,
        left: `${tag.coordinates.x}%`,
      }}
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
  cursor: grab; 
`;
