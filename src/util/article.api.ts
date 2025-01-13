import { PostArticle } from "../types/article.types";
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
export async function postArticle(newArticle: PostArticle) {
  const productRef = collection(db, "articles");
  const docRef = await addDoc(productRef, newArticle);
  console.log("생성된 문서 ID: ", docRef.id);
}
