import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const UserDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { usuario } = route.params || {};

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum usuário selecionado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>

      <View style={localStyles.infoContainer}>
        <Text style={localStyles.label}>Nome completo:</Text>
        <Text style={localStyles.value}>{usuario.nome}</Text>
      </View>

      <View style={localStyles.infoContainer}>
        <Text style={localStyles.label}>Email:</Text>
        <Text style={localStyles.value}>{usuario.email || 'Não informado'}</Text>
      </View>

      <View style={localStyles.infoContainer}>
        <Text style={localStyles.label}>Tipo de usuário:</Text>
        <Text style={localStyles.value}>{usuario.tipo}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => navigation.goBack()} color="#546A83" />
      </View>
    </View>
  );
};

export default UserDetails;

const localStyles = StyleSheet.create({
  infoContainer: {
    marginTop: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 3,
  },
});
