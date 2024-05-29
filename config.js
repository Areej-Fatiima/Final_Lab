// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Firestore ko import karein
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBYtVoO13QtSDhnSDXI7OfB83ox3PDp-oE",
//   authDomain: "project-617cb.firebaseapp.com",
//   projectId: "project-617cb",
//   storageBucket: "project-617cb.appspot.com",
//   messagingSenderId: "1093747021590",
//   appId: "1:1093747021590:web:c942203d0b011f837a2237",
//   measurementId: "G-D9NYTDTYP0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app); // Firestore ko initialize karein
// const storage = getStorage(app);
// export { app, auth, db, storage };


import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYtVoO13QtSDhnSDXI7OfB83ox3PDp-oE",
  authDomain: "project-617cb.firebaseapp.com",
  projectId: "project-617cb",
  storageBucket: "project-617cb.appspot.com",
  messagingSenderId: "1093747021590",
  appId: "1:1093747021590:web:c942203d0b011f837a2237",
  measurementId: "G-D9NYTDTYP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);

export { app, auth, db, storage };


