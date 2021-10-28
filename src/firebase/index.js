import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
      //FIREBASE CONFIGURATION OBJECT
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// SDKs
const fbFirestore = firebase.firestore();
const fb_firestore = firebase.firestore
const fbAuth = firebase.auth();
const fb_auth = firebase.auth;
const fbStorage = firebase.storage();
// LISTENERS


export { fbAuth, fbFirestore, fbStorage, fb_auth, fb_firestore };
