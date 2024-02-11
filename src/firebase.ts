import { initializeApp } from 'firebase/app';
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqb-qvYzLrFEPlUwEitm2urdmvbKKSHZ0",
  authDomain: "customer-tracker-2a5c1.firebaseapp.com",
  projectId: "customer-tracker-2a5c1",
  storageBucket: "customer-tracker-2a5c1.appspot.com",
  messagingSenderId: "488480034382",
  appId: "1:488480034382:web:bdd5b0278a25951f14fd1f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await getRedirectResult(auth);

  if (!result) {
    await signInWithRedirect(auth, provider);
  }
}