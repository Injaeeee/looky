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
  searchTerm: string = "",
): Promise<Article[]> {
  const productRef = collection(db, "articles");
  let q = query(productRef);

  // Firestore 필터 조건 추가
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (key === "height" || key === "gender") {
        q = query(q, where(`writer.${key}`, "==", value));
      } else {
        q = query(q, where(key, "==", value));
      }
    }
  });
  const querySnapshot = await getDocs(q);

  // Firestore에서 받아온 데이터를 변환
  let articles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));

  // 카테고리 필터 적용
  if (selectedCategories.length > 0) {
    articles = articles.filter((article) =>
      article.tags.some((tag) => selectedCategories.includes(tag.category)),
    );
  }

  // 검색어 필터 적용
  if (searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    articles = articles.filter((article) =>
      article.title.toLowerCase().includes(lowerSearchTerm),
    );
  }

  return articles;
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
