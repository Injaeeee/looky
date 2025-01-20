import { User } from "../../types/user.types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Avatar,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { GenderSelect, HeightSelect, MoodSelect } from "../common/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfile } from "../../util/user.api";
import { uploadImage } from "../../util/image.api";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  height: z.string().min(1, "키를 입력해주세요."),
  gender: z.string().min(1, "성별을 선택해주세요."),
  mood: z.string().min(1, "무드를 선택해주세요."),
});

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: ArticleModalProps) {
  const [liked, setLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(
    user?.imageUrl || "/icon/user.svg",
  );
  const [file, setFile] = useState<File | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      height: user?.height,
      gender: user?.gender,
      mood: user?.mood,
    },
  });

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하로 업로드해야 합니다.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
    setFile(file);
    event.target.value = "";
  };

  const handleDeleteImage = () => {
    setImageSrc("/icon/user.svg");
    setFile(null);
  };

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  const onSubmit = async (data: any) => {
    let imageUrl: string = imageSrc ?? "/icon/user.svg";
    if (file) {
      const uploadedImageUrl = await uploadImage(file);
      imageUrl = uploadedImageUrl ?? "/icon/user.svg";
    }

    if (user) {
      await updateUserProfile(user, data, imageUrl);
      onClose();
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
          프로필 수정
        </ModalHeader>
        <ModalCloseButton />
        <ArticleBody padding="20px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ArticleContent>
              <UserSpec>
                <Avatar name={user?.name} src={imageSrc} boxSize="40px" />
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <BlackButton
                  onClick={() => document.getElementById("file-input")?.click()}
                  type="button"
                >
                  upload new picture
                </BlackButton>
                <WhiteButton type="button" onClick={handleDeleteImage}>
                  delete
                </WhiteButton>
              </UserSpec>
              <InputWrapper>
                <Title>
                  이름<span>*</span>
                </Title>
                <Input
                  focusBorderColor="pink.100"
                  size="lg"
                  placeholder="이름을 입력해주세요."
                  {...register("name")}
                />
                {errors.name && (
                  <ErrorText>{errors.name.message as string}</ErrorText>
                )}
              </InputWrapper>

              <SelectWrapper>
                <InputWrapper>
                  <Title>무드</Title>
                  <MoodSelect {...register("mood")} />
                  {errors.mood && (
                    <ErrorText>{errors.mood.message as string}</ErrorText>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <Title>키</Title>
                  <HeightSelect {...register("height")} />
                  {errors.height && (
                    <ErrorText>{errors.height.message as string}</ErrorText>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <Title>성별 </Title>
                  <GenderSelect {...register("gender")} />
                  {errors.gender && (
                    <ErrorText>{errors.gender.message as string}</ErrorText>
                  )}
                </InputWrapper>
              </SelectWrapper>
              <Button>저장하기</Button>
            </ArticleContent>
          </form>
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
  position: relative;
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

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-around;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: var(--pink100);
  position: absolute;
  bottom: -20px;
  left: 0;
`;
