import imageCompression from "browser-image-compression";

export const useImageCompressor = () => {
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // 1MB 이하로 압축
      maxWidthOrHeight: 800, // 최대 800px로 조정
      useWebWorker: true,
      fileType: "image/webp", // webp로 변환
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      return file;
    }
  };

  return { compressImage };
};
