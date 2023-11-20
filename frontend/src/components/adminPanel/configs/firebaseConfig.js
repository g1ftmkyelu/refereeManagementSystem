import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({

    apiKey: "AIzaSyCDUZNzlJpQJpO52-8OSjuveW4HbXLIhB8",

    authDomain: "server-services-50a49.firebaseapp.com",

    projectId: "server-services-50a49",

    storageBucket: "server-services-50a49.appspot.com",

    messagingSenderId: "484734300353",

    appId: "1:484734300353:web:e9cf321a4f2f9ba3c72440",

    measurementId: "G-L9NGDPF6ZZ"

});


export const storage = getStorage(app);

