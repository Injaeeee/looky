import { useEffect, useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { uploadImage, getImageURL } from "../util/image.api";
import { getDocuments } from "../util/product.api";

export default function TestPage() {
  const [categoryItems, setCategoryItems] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getDocuments();
        setCategoryItems(documents); // 데이터 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      setImageUrl(url || null); // 업로드된 이미지 URL 설정
    }
  };

  return (
    <div>
      <h1>메인 페이지</h1>
      <ul>
        {categoryItems.map((doc, index) => (
          <li key={index}>{doc.id}</li> // 문서 ID 표시
        ))}
      </ul>
      {/* 이미지 업로드 */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}{" "}
      {/* 업로드된 이미지 표시 */}
    </div>
  );
}
