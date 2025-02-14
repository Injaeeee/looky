import imageCompression from "browser-image-compression";

export const useImageCompressor = () => {
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // 1MB 이하로 압축
      maxWidthOrHeight: 650, // 최대 px 조정
      useWebWorker: true,
      fileType: "image/webp", // webp로 변환
    };

    try {
      const compressedFile = await imageCompression(file, options);

      // 새로운 파일 객체를 만들어 확장자를 .webp로 설정
      const webpFile = new File(
        [compressedFile],
        `${file.name.replace(/\.[^/.]+$/, "")}.webp`,
        {
          type: "image/webp",
        },
      );

      return webpFile;
    } catch (error) {
      console.error("이미지 압축 중 오류 발생:", error);
      return file; // 에러 발생 시 원본 파일 반환
    }
  };

  return { compressImage };
};
