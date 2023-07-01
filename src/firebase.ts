import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqb-qvYzLrFEPlUwEitm2urdmvbKKSHZ0",
  authDomain: "customer-tracker-2a5c1.firebaseapp.com",
  projectId: "customer-tracker-2a5c1",
  storageBucket: "customer-tracker-2a5c1.appspot.com",
  messagingSenderId: "488480034382",
  appId: "1:488480034382:web:bdd5b0278a25951f14fd1f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const data = await signInWithPopup(auth, provider);
    return data.user;
  } catch(err) {
    console.error(err);
  }
  // signInWithPopup(auth, provider)
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err))
}