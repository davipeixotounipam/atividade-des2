import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../styles/styles'; 

const ProjectDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projeto } = route.params || {};

  if (!projeto) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum projeto selecionado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{projeto.titulo}</Text>
      <Text style={localStyles.label}>Autor: <Text style={localStyles.value}>{projeto.autor}</Text></Text>
      <Text style={localStyles.label}>Período: <Text style={localStyles.value}>{projeto.periodo}</Text></Text>
      <Text style={localStyles.label}>Curso: <Text style={localStyles.value}>{projeto.curso}</Text></Text>
      <Text style={localStyles.label}>Ano: <Text style={localStyles.value}>{projeto.ano}</Text></Text>
      <Text style={[localStyles.label, { marginTop: 10 }]}>Descrição:</Text>
      <Text style={localStyles.value}>{projeto.descricao || 'Sem descrição'}</Text>

    </View>
  );
};

export default ProjectDetails;

const localStyles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});
