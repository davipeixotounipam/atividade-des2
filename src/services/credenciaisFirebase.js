 // src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-_FKeVfCL46MvEzMAaX-u1ofKVkhNliw",
  authDomain: "atividadedesenvolvimentoii.firebaseapp.com",
  projectId: "atividadedesenvolvimentoii",
  storageBucket: "atividadedesenvolvimentoii.firebasestorage.app",
  messagingSenderId: "565670135875",
  appId: "1:565670135875:web:5710736533b9c221adacf6"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;