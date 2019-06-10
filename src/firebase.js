import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

// 1) setup config

const firebaseConfig = {
  apiKey: "AIzaSyCfxiyJx7VGzFSDgYMieeyqZe0M1oWkpB4",
  authDomain: "m-city-8ca8c.firebaseapp.com",
  databaseURL: "https://m-city-8ca8c.firebaseio.com",
  projectId: "m-city-8ca8c",
  storageBucket: "m-city-8ca8c.appspot.com",
  messagingSenderId: "678525660766",
  appId: "1:678525660766:web:959ecf02ee5db66a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// connect to db
const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");

// test connection
// firebaseDB
//   .ref("matches")
//   .once("value")
//   .then(snapshot => {
//     console.log(snapshot.val());
//   });

export { firebase, firebaseMatches };
