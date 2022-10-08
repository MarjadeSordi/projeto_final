
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEvkv4eA5GgVZtNmkne8mM8NUljVCsGjw",
    authDomain: "evita-project.firebaseapp.com",
    projectId: "evita-project",
    storageBucket: "evita-project.appspot.com",
    messagingSenderId: "1071304149275",
    appId: "1:1071304149275:web:bcd723bc4d447263c4ebbe"  
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);