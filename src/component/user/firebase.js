import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQbXdMSyztSVXqgpksn7_wO3steGIiDKM",
  authDomain: "instagram-clone-ef0fb.firebaseapp.com",
  databaseURL: "https://instagram-clone-ef0fb.firebaseio.com",
  projectId: "instagram-clone-ef0fb",
  storageBucket: "instagram-clone-ef0fb.appspot.com",
  messagingSenderId: "68717355692",
  appId: "1:68717355692:web:ca92baba35af7740a7b509",
  measurementId: "G-W13Q8VM7Q2"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
