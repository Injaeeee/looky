// src/api/user.api.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/authStore";

interface UserData {
  email: string;
  password: string;
}

/**
 * Firebase 회원가입 함수
 * @param {UserData} data - 회원가입에 필요한 데이터 (이메일, 비밀번호)
 * @returns {Promise<void>} 성공하면 사용자 정보를 반환, 실패하면 에러를 던짐
 */
export const signUpUser = async (data: UserData): Promise<void> => {
  const { email, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("회원가입 성공:", userCredential.user);
  } catch (error: any) {
    console.error("회원가입 오류:", error);
    throw new Error(error.message || "회원가입에 실패했습니다.");
  }
};

export const loginUser = async (data: UserData): Promise<void> => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    useAuthStore.getState().login({
      uid: user.uid,
      email: user.email || "",
    });

    console.log("로그인 성공:", user);
  } catch (error: any) {
    console.error("로그인 오류:", error);
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

    // Zustand 전역 상태에서 로그아웃 처리
    useAuthStore.getState().logout();

    console.log("로그아웃 성공");
  } catch (error: any) {
    console.error("로그아웃 오류:", error);
    throw new Error(error.message || "로그아웃에 실패했습니다.");
  }
};
