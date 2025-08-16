// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpT-XyPKNPKGetKYl_qDPKsdqL_u2SCyk",
  authDomain: "atr-egclothes-2faeb.firebaseapp.com",
  databaseURL: "https://atr-egclothes-2faeb-default-rtdb.firebaseio.com",
  projectId: "atr-egclothes-2faeb",
  storageBucket: "atr-egclothes-2faeb.firebasestorage.app",
  messagingSenderId: "455708726120",
  appId: "1:455708726120:web:a35a5ffbbb8c5e8b0dfcdd",
  measurementId: "G-99J4WYBTM9"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
