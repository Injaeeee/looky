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
  Query,
} from "firebase/firestore";
import { showToast } from "../components/common/toast";

// export function buildQuery(
//   filters: ArticleFilter,
//   selectedCategories: string[],
//   searchTerm: string,
// ): Query {
//   let q = query(collection(db, "articles"));

//   // Firestore 필터 조건 추가
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) {
//       if (key === "height" || key === "gender") {
//         q = query(q, where(`writer.${key}`, "==", value));
//       } else {
//         q = query(q, where(key, "==", value));
//       }
//     }
//   });

//   console.log(selectedCategories);

//   // 검색어 필터 조건 추가
//   if (searchTerm.trim()) {
//     // 검색어가 있을 경우, 정확히 일치하는 글자가 포함된 데이터만 필터링
//     q = query(q, where("title", ">=", searchTerm.toLowerCase()));
//   }
//   return q;
// }

// export async function getArticles(
//   filters: ArticleFilter,
//   selectedCategories: string[],
//   searchTerm: string = "",
// ): Promise<Article[]> {
//   const q = buildQuery(filters, selectedCategories, searchTerm);
//   const querySnapshot = await getDocs(q);

//   // Firestore에서 받아온 데이터를 변환
//   let articles = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<Article, "id">),
//   }));

//   if (selectedCategories.length > 0) {
//     articles = articles.filter((article) => {
//       // tags 배열의 각 tag 객체에 대해 category 속성이 selectedCategories에 포함되는지 확인
//       return article.tags.some((tag: { category: string }) =>
//         selectedCategories.includes(tag.category),
//       );
//     });
//   }

//   return articles;
// }

export function filterArticles(
  articles: Article[],
  selectedCategories: string[],
  searchTerm: string,
): Article[] {
  if (selectedCategories.length > 0) {
    articles = articles.filter((article) =>
      article.tags.some((tag) => selectedCategories.includes(tag.category)),
    );
  }

  if (searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    articles = articles.filter((article) =>
      article.title.toLowerCase().includes(lowerSearchTerm),
    );
  }

  return articles;
}

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

  // 필터, 카테고리, 검색어 필터 적용
  articles = filterArticles(articles, selectedCategories, searchTerm);

  return articles;
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
