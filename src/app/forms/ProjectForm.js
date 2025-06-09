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
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import auth from '../../services/credenciaisFirebaseAuth';
import { db } from '../../services/credenciaisFirebase';
import styles from '../styles/styles';

const ProjectForm = () => {
  const navigation = useNavigation();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [curso, setCurso] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSalvar = async () => {
    if (!titulo || !autor || !periodo || !curso) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      await addDoc(collection(db, 'projetos'), {
        titulo,
        autor,
        periodo,
        curso,
        descricao,
        ano: new Date().getFullYear().toString(),
        criadoPor: user.uid, // Campo adicionado para controle de permissões
      });

      Alert.alert('Sucesso', 'Projeto salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o projeto.');
      console.error('Erro ao salvar projeto:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.label}>Título*</Text>
            <TextInput
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Digite o título do projeto"
              maxLength={100}
            />

            <Text style={styles.label}>Autor*</Text>
            <TextInput
              style={styles.input}
              value={autor}
              onChangeText={setAutor}
              placeholder="Digite o nome do autor"
              maxLength={60}
            />

            <Text style={styles.label}>Período*</Text>
            <TextInput
              style={styles.input}
              value={periodo}
              onChangeText={setPeriodo}
              placeholder="Ex: 1º semestre"
              maxLength={20}
            />

            <Text style={styles.label}>Curso*</Text>
            <TextInput
              style={styles.input}
              value={curso}
              onChangeText={setCurso}
              placeholder="Digite o nome do curso"
              maxLength={60}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Digite a descrição do projeto"
              multiline
              maxLength={500}
            />

            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={handleSalvar} color="#18C0C1" />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Voltar" onPress={() => navigation.goBack()} color="#546A83" />
            </View>
            
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
                * Campos obrigatórios
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProjectForm;