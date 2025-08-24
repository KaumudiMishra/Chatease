import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // or use getFirestore for Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAkLbNWUduBM1icxwrzNm1pg930ZF3V8M4",
  authDomain: "nwbot-c2fc9.firebaseapp.com",
  databaseURL: "https://nwbot-c2fc9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nwbot-c2fc9",
  storageBucket: "nwbot-c2fc9.firebasestorage.app",
  messagingSenderId: "224768863460",
  appId: "1:224768863460:web:14fa0fcca6be48729a50f1",
  measurementId: "G-MN52R8QCQ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // or getFirestore(app)
