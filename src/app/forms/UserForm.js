import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/credenciaisFirebase';
import styles from '../styles/styles';

const UserForm = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [senha, setSenha] = useState('');

  const handleSalvar = async () => {
    if (!nome || !email || !tipo || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'usuarios'), {
        nome,
        email,
        tipo,
        senha,
        criadoEm: new Date(),
      });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome completo"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite o e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Tipo</Text>
            <View style={[styles.input, { padding: 0 }]}>
              <Picker
                selectedValue={tipo}
                onValueChange={(itemValue) => setTipo(itemValue)}
              >
                <Picker.Item label="Administrador" value="administrador" />
                <Picker.Item label="Aluno" value="aluno" />
                <Picker.Item label="Avaliador" value="avaliador" />
              </Picker>
            </View>

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite a senha"
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={handleSalvar} color="#18C0C1" />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Voltar" onPress={() => navigation.goBack()} color="#546A83" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserForm;
