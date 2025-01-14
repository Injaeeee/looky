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
  orderBy,
} from "firebase/firestore";

export async function getArticles(
  filters: ArticleFilter,
  selectedCategories: string[],
): Promise<Article[]> {
  const productRef = collection(db, "articles");

  let q = query(productRef);

  // 필터 조건을 추가
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      q = query(q, where(key, "==", value));
    }
  });

  const querySnapshot = await getDocs(q);

  // selectedCategories가 비어 있으면 모든 게시물 반환
  if (selectedCategories.length === 0) {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Article, "id">),
    }));
  }

  // selectedCategories가 있을 때만 필터링
  const filteredArticles = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Article, "id">),
    }))
    .filter((article) => {
      return article.tags.some((tag) =>
        selectedCategories.includes(tag.category),
      );
    });

  return filteredArticles;
}

export async function getRankingArticles(): Promise<Article[]> {
  const productRef = collection(db, "articles");
  const q = query(productRef, orderBy("createAt", "desc"));
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
