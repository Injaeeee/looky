import { Article, ArticleFilter, PostArticle } from "../types/article.types";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  setDoc,
  where,
  addDoc,
} from "firebase/firestore";

export async function getArticles(filters: ArticleFilter): Promise<Article[]> {
  const productRef = collection(db, "articles");

  let q = query(productRef);

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      q = query(q, where(key, "==", value));
      console.log(q, key, value);
    }
  });

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));
}

export async function postArticle(newArticle: PostArticle) {
  const productRef = collection(db, "articles");
  const docRef = await addDoc(productRef, newArticle);
  console.log("생성된 문서 ID: ", docRef.id);
}
