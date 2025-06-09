// src/services/credenciaisFirebaseAuth.js
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import appFirebase from './credenciaisFirebase'; // Importa o app já inicializado

const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default auth;