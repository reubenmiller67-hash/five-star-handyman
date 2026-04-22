import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnq3cXkzsQ8bi8e0MMzWhanONN1s9rFyo",
  authDomain: "star-handyman.firebaseapp.com",
  projectId: "star-handyman",
  storageBucket: "star-handyman.firebasestorage.app",
  messagingSenderId: "633010960111",
  appId: "1:633010960111:web:dff6ad7cd0e3ef6d7c8d1a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const ADMIN_EMAILS = [
  "reubenmiller67@gmail.com",
  "fivestarhandyman23@gmail.com"
];

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
