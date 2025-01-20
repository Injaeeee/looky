import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuthStore } from "../store/authStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Gender, Height, Mood, User, UserData } from "../types/user.types";

/**
 * Firebase 회원가입 함수
 * @param {UserData} data - 회원가입에 필요한 데이터 (이메일, 비밀번호, 이름, 무드)
 * @returns {Promise<void>} 성공하면 사용자 정보를 반환, 실패하면 에러를 던짐
 */
export const signUpUser = async (data: UserData): Promise<void> => {
  const { email, password, name, mood, height, gender } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      imageUrl: "/icon/user.svg",
      name,
      mood,
      height,
      gender,
      likeArticle: [],
    });
  } catch (error: any) {
    console.error("회원가입 오류:", error);
    throw new Error(error.message || "회원가입에 실패했습니다.");
  }
};

/**
 * Firebase 로그인 함수
 * @param {UserData} data - 로그인에 필요한 데이터 (이메일, 비밀번호)
 * @returns {Promise<void>} 성공하면 사용자 정보를 반환, 실패하면 에러를 던짐
 */
export const loginUser = async (data: UserData): Promise<void> => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("사용자 데이터를 찾을 수 없습니다.");
    }

    const userData = userDocSnap.data();
    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    useAuthStore.getState().login({
      uid: user.uid,
      email: user.email || "",
      articleLike: userData.articleLike || [],
      imageUrl: userData.imageUrl,
      name: userData.name,
      mood: userData.mood,
      height: userData.height,
      gender: userData.gender,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    throw new Error(error.message || "로그인에 실패했습니다.");
  }
};

/**
 * Firebase 로그아웃 함수
 * @returns {Promise<void>}
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);

    useAuthStore.getState().logout();

    const likeCountKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("likeCount-"),
    );
    likeCountKeys.forEach((key) => localStorage.removeItem(key));
  } catch (error: any) {
    console.error("로그아웃 오류:", error);
    throw new Error(error.message || "로그아웃에 실패했습니다.");
  }
};

export const updateUserProfile = async (
  user: User,
  updates: { name: string; height: Height; gender: Gender; mood: Mood },
  imageUrl: string,
): Promise<void> => {
  const { login } = useAuthStore.getState();

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      ...updates,
      imageUrl,
    });

    login({
      ...user,
      imageUrl,
      ...updates,
    });
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    throw error;
  }
};

export const updateUserLikeStatus = async (
  userId: string,
  articleId: string,
  liked: boolean,
): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  const { login, user } = useAuthStore.getState();

  try {
    if (liked) {
      await updateDoc(userDocRef, {
        articleLike: arrayUnion(articleId),
      });

      login({
        ...user,
        articleLike: [...(user?.articleLike || []), articleId],
        uid: user?.uid || "",
        email: user?.email || "",
        imageUrl: user?.imageUrl || "",
      });
    } else {
      await updateDoc(userDocRef, {
        articleLike: arrayRemove(articleId),
      });

      login({
        ...user,
        articleLike: user?.articleLike?.filter((id) => id !== articleId) || [],
        uid: user?.uid || "",
        email: user?.email || "",
        imageUrl: user?.imageUrl || "",
      });
    }
  } catch (error) {
    console.error("좋아요 상태 업데이트 실패:", error);
    throw error;
  }
};
