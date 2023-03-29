
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import apiKey from '../.apiKey.js'

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "tenzies-f095e.firebaseapp.com",
  projectId: "tenzies-f095e",
  storageBucket: "tenzies-f095e.appspot.com",
  messagingSenderId: "1033800991254",
  appId: "1:1033800991254:web:1467adb40669cf9fdbab37",
  measurementId: "G-EY6HFX7V6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);