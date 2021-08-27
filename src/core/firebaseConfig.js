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
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const createUser = async(email, password) =>{
    const user = await auth.createUserWithEmailAndPassword(email, password)
    console.log('log: user', user)    
    return user
}
export const firestore = firebase.firestore();
export const updateUserDocument = async (user, updates={})=>{
    const userRef = firestore.doc(`users/${user.email}`);
    try {
        await userRef.set({...user, ...updates});
      } catch (error) {
        console.error("Error creating user document", error);
      }
}
export const generateUserDocument = async (user, additionalData) => {
    if (!user) return {};
    const userRef = firestore.doc(`users/${user.email}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          uid: user.uid,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
  };