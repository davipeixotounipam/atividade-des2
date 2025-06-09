import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/credenciaisFirebase';
import styles from '../styles/styles';

const Home = () => {
  const navigation = useNavigation();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjetos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'projetos'));
      const listaProjetos = [];
      querySnapshot.forEach((doc) => {
        listaProjetos.push({ id: doc.id, ...doc.data() });
      });
      setProjetos(listaProjetos);
    } catch (error) {
      console.log('Erro ao buscar projetos:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjetos();
  }, []);

  const handleViewDetails = (item) => {
    navigation.navigate('Detalhes do Projeto', { projeto: item });
  };

  const renderItem = ({ item }) => (
    <View style={localStyles.item}>
      <Text style={localStyles.titulo}>{item.titulo}</Text>
      <Text>Ano: {item.ano || 'N/A'}</Text>
      <Text>Curso: {item.curso}</Text>
      <Text>Período: {item.periodo}</Text>

      <View style={localStyles.actions}>
        <TouchableOpacity onPress={() => handleViewDetails(item)} style={localStyles.iconButton}>
          <Icon name="visibility" size={24} color="#546A83" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#18C0C1" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={localStyles.lista}
      />
    </View>
  );
};

export default Home;

const localStyles = StyleSheet.create({
  item: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginRight: 15,
  },
  lista: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },
});
