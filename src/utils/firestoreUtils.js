// firestoreUtils.js
import { db } from "./firebase";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";

export const addBusinessCard = async (data) => {
  const docRef = await addDoc(collection(db, "businessCards"), data);
  return docRef.id;
};

export const updateBusinessCard = async (id, data) => {
  const docRef = doc(db, "businessCards", id);
  await setDoc(docRef, data, { merge: true });
};

export const getBusinessCardById = async (id) => {
  const docRef = doc(db, "businessCards", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};
