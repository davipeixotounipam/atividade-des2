import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import auth from '../../services/credenciaisFirebaseAuth';
import { db } from '../../services/credenciaisFirebase';
import styles from '../styles/styles';
import { useTipoUsuario } from '../../hooks/useTipoUsuario';


export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userEmail = userCredential.user.email;
          const q = query(collection(db, 'usuarios'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            // useTipoUsuario({ tipoExternamente: userData.tipo });
            navigation.navigate('HomeDrawer', { tipo: userData.tipo }); // 👈 envia tipo para limitar as rotas
          } else {
            Alert.alert('Erro', 'Usuário não encontrado na base de dados.');
          }
        })
        .catch((error) => {
          Alert.alert('Erro', 'Usuário ou senha inválidos');
          console.error('Erro no login:', error);
        });
    };



    const handleRegister = () => {
      navigation.navigate('Registro')
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.texto}>Registrar</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }