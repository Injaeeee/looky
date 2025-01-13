import { Article, PostArticle } from "../types/article.types";
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

export async function getArticles(): Promise<Article[]> {
  const productRef = query(collection(db, "articles"));
  const querySnapshot = await getDocs(productRef);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">), // 나머지 필드 매핑
  }));
}

export async function postArticle(newArticle: PostArticle) {
  const productRef = collection(db, "articles");
  const docRef = await addDoc(productRef, newArticle);
  console.log("생성된 문서 ID: ", docRef.id);
}
