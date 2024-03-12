
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB1Ya5d_vpzP9j983WV5kfCnwwv1fE_kQY",
    authDomain: "cfi-jgec.firebaseapp.com",
    projectId: "cfi-jgec",
    storageBucket: "cfi-jgec.appspot.com",
    messagingSenderId: "78661653179",
    appId: "1:78661653179:web:34de11838c24af8f41cf9e",
    measurementId: "G-0F256NT589"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);