import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { showToast } from "../components/common/toast";

// 파일 업로드 함수
export const uploadImage = async (file: File): Promise<string | undefined> => {
  if (!file) return;
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    showToast({
      title: "파일 업로드 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
  }
};

// 파일 다운로드 URL 가져오기 함수
export const getImageURL = async (
  fileName: string,
): Promise<string | undefined> => {
  const storageRef = ref(storage, `images/${fileName}`);

  try {
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    showToast({
      title: "파일 다운로드 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
  }
};
