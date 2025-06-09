import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '../services/credenciaisFirebaseAuth';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); 
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao sair');
        console.error(error);
      });
  }, []);

  return null;
}
