import firebase from 'firebase'

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "hashbrowns-102af.firebaseapp.com",
  databaseURL: "https://hashbrowns-102af.firebaseio.com",
  projectId: "hashbrowns-102af",
  storageBucket: "",
  messagingSenderId: "986005045089"
}

export var firebaseApp = firebase.initializeApp(config)

export var db = firebaseApp.database()