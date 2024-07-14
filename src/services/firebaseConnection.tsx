import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCXx0LaORz8m4uYo49FLiBid3LPcDMve8Q",
    authDomain: "petshop-app-a1.firebaseapp.com",
    projectId: "petshop-app-a1",
    storageBucket: "petshop-app-a1.appspot.com",
    messagingSenderId: "778942460153",
    appId: "1:778942460153:web:489606af330c9c8bf67228",
    measurementId: "G-MMGW1FV868"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}
