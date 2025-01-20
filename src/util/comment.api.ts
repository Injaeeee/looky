import { Comment } from "../types/comment.types";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function postComment(articleId: string, comments: Comment) {
  try {
    const articleRef = doc(db, "articles", articleId);

    await updateDoc(articleRef, {
      comments: arrayUnion(comments),
    });
  } catch (error) {
    console.error("댓글 추가 중 오류 발생:", error);
    throw new Error("댓글 추가 실패");
  }
}
