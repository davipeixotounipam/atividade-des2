import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/credenciaisFirebase';
import { useTipoUsuario } from '../../hooks/useTipoUsuario';

const Users = () => {
  const { tipo, loading: loadingTipo } = useTipoUsuario();

  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuariosCollection = collection(db, 'usuarios');

    const unsubscribe = onSnapshot(
      usuariosCollection,
      (querySnapshot) => {
        const lista = [];
        querySnapshot.forEach((doc) => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setUsuarios(lista);
        setLoading(false);
      },
      (error) => {
        Alert.alert('Erro', 'Falha ao carregar usuários');
        setLoading(false);
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleViewDetails = (item) => {
    navigation.navigate('Detalhes do Usuário', { usuario: item });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      Alert.alert('Sucesso', 'Usuário excluído');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário');
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={localStyles.item}>
      <Text style={localStyles.nome}>{item.nome}</Text>
      <Text>Tipo: {item.tipo}</Text>

      <View style={localStyles.actions}>
        <TouchableOpacity
          onPress={() => handleViewDetails(item)}
          style={localStyles.iconButton}
        >
          <Icon name="visibility" size={24} color="#546A83" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={localStyles.iconButton}
        >
          <Icon name="delete" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading || loadingTipo) {
    return (
      <View style={[localStyles.loadingContainer]}>
        <ActivityIndicator size="large" color="#18C0C1" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={localStyles.lista}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum usuário encontrado.</Text>}
      />

        <TouchableOpacity
          style={localStyles.fab}
          onPress={() => navigation.navigate('Formulário de Usuário')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>

    </View>
  );
};

export default Users;

const localStyles = StyleSheet.create({
  item: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  nome: {
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
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#18C0C1',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  lista: {
    padding: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
