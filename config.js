import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDe26yI2kiZr_OTMpRnWsjF0tqZFJpjfdo",
  authDomain: "barter-app-2809b.firebaseapp.com",
  projectId: "barter-app-2809b",
  storageBucket: "barter-app-2809b.appspot.com",
  messagingSenderId: "14709936551",
  appId: "1:14709936551:web:a3b4f888f00569a0fe6682"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();