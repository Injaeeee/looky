import { showToast } from "../components/common/toast";

export const useImageValidation = () => {
  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateImage = (file: File) => {
    if (!imageExtensionValidCheck(file.name)) {
      showToast({
        title: "이미지 파일만 업로드 가능합니다.",
        status: "error",
      });

      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      showToast({
        title: "파일 크기는 5MB 이하로 업로드해야 합니다.",
        status: "error",
      });
      return false;
    }

    return true;
  };

  return { validateImage };
};
