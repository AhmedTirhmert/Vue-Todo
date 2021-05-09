import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDPbsE0YOca9cDdezjY49Mgq8A9Vbxgng4",
  authDomain: "todoapp-63f53.firebaseapp.com",
  projectId: "todoapp-63f53",
  storageBucket: "todoapp-63f53.appspot.com",
  messagingSenderId: "790111046144",
  appId: "1:790111046144:web:1138573f758c57da31a6e5",
  measurementId: "G-Z4T3ELS0R8",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const fbFirestore = firebase.firestore();
const fbAuth = firebase.auth();
const fb_auth = firebase.auth;
const fbStorage = firebase.storage();

export { fbAuth, fbFirestore, fbStorage, fb_auth };
