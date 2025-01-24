import { Comment } from "../types/comment.types";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { showToast } from "../components/common/toast";

export async function postComment(articleId: string, comments: Comment) {
  try {
    const articleRef = doc(db, "articles", articleId);

    await updateDoc(articleRef, {
      comments: arrayUnion(comments),
    });

    showToast({
      title: "댓글이 추가되었습니다.",
      status: "success",
    });
  } catch (error) {
    showToast({
      title: "댓글 추가 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
    throw new Error("댓글 추가 실패");
  }
}

export async function deleteComment(articleId: string, comment: Comment) {
  try {
    const articleRef = doc(db, "articles", articleId);

    await updateDoc(articleRef, {
      comments: arrayRemove(comment),
    });

    showToast({
      title: "댓글이 삭제되었습니다.",
      status: "success",
    });
  } catch (error) {
    showToast({
      title: "댓글 삭제 실패",
      description: "오류가 발생했습니다.",
      status: "error",
    });
    throw new Error("댓글 삭제 실패");
  }
}
