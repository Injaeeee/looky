import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export async function getDocuments() {
  const productRef = query(collection(db, "product"));
  const queryCategory = await getDocs(productRef);

  return queryCategory.docs;
}

export async function postDocuments() {
  const productRef = doc(db, "product", "custom-id"); // custom-id는 사용자가 지정한 문서 ID
  await setDoc(productRef, {
    name: "Custom Product",
    price: 200,
  });
  console.log("문서 ID: ", productRef); // 새로 생성된 문서 출력
}
