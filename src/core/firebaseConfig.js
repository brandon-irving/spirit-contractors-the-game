import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuehaOKFHvHfNbcfwSy2SNnO_iURlxl6k",
    authDomain: "dnd-story-assistant.firebaseapp.com",
    databaseURL: "https://dnd-story-assistant.firebaseio.com",
    projectId: "dnd-story-assistant",
    storageBucket: "dnd-story-assistant.appspot.com",
    messagingSenderId: "783675104937",
    appId: "1:783675104937:web:d762c685d9708b3b21d3b8",
    measurementId: "G-BE6J3N57ET"
};
const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();