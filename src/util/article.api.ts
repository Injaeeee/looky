import { Article, ArticleFilter, PostArticle } from "../types/article.types";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  where,
  addDoc,
  orderBy,
  updateDoc,
  increment,
  limit,
  deleteDoc,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { showToast } from "../components/common/toast";

export async function getArticles(
  filters: ArticleFilter,
  startAfterDoc?: QueryDocumentSnapshot,
  pageSize: number = 4,
): Promise<{
  articles: Article[];
  lastDoc: QueryDocumentSnapshot | undefined;
}> {
  const articlesRef = collection(db, "articles");
  let q = query(articlesRef, limit(pageSize));

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

  // 페이지네이션 처리
  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const querySnapshot = await getDocs(q);
  const articles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));

  const lastDoc =
    querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : undefined;

  return { articles, lastDoc };
}

export function filterArticles(
  articles: Article[],
  selectedCategories: string[],
  searchTerm: string,
): Article[] {
  return articles.filter((article) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      article.tags.some((tag) => selectedCategories.includes(tag.category));

    const matchesSearchTerm =
      !searchTerm.trim() ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });
}

export async function postArticle(newArticle: PostArticle) {
  try {
    const productRef = collection(db, "articles");
    const docRef = await addDoc(productRef, newArticle);
    showToast({
      title: "게시물이 등록되었습니다.",
      status: "success",
    });

    return docRef.id;
  } catch (error) {
    showToast({
      title: "게시물 등록 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
  }
}

export async function deleteArticle(articleId: string) {
  try {
    const articleRef = doc(db, "articles", articleId);
    await deleteDoc(articleRef);
    showToast({
      title: "게시물이 삭제되었습니다.",
      status: "success",
    });
  } catch (error) {
    showToast({
      title: "게시물 삭제 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
  }
}

export async function updateLikeCount(
  articleId: string,
  incrementValue: number,
) {
  const articleRef = doc(db, "articles", articleId);
  await updateDoc(articleRef, {
    likeCount: increment(incrementValue),
  });
}

export async function getLikedArticles(
  likedArticleIds: string[],
): Promise<Article[]> {
  if (likedArticleIds.length === 0) return [];

  const productRef = collection(db, "articles");
  const q = query(productRef, where("__name__", "in", likedArticleIds));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));
}

export async function getMyArticles(writerUid: string): Promise<Article[]> {
  const productRef = collection(db, "articles");
  const q = query(productRef, where("writer.uid", "==", writerUid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));
}

export async function getRankingArticles(): Promise<Article[]> {
  const productRef = collection(db, "articles");
  const q = query(productRef, orderBy("likeCount", "desc"), limit(7));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));
}
