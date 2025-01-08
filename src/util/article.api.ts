import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export async function getArticles() {
  const productRef = query(collection(db, "article"));
  const queryCategory = await getDocs(productRef);

  return queryCategory.docs;
}
export async function postArticle() {
  const productRef = collection(db, "articles"); // 컬렉션 참조
  const newArticle = {
    title: "New Article",
    content: "This is the content of the new article.",
    createdAt: new Date().toISOString(), // 생성 시각
    tags: ["firebase", "javascript"], // 예시 태그
  };

  const docRef = await addDoc(productRef, newArticle); // 문서 추가 및 자동 ID 생성
  console.log("생성된 문서 ID: ", docRef.id); // 새로 생성된 문서의 ID 출력
}
