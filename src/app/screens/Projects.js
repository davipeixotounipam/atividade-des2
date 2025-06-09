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
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../../services/credenciaisFirebase';
import styles from '../styles/styles';
import { useTipoUsuario } from '../../hooks/useTipoUsuario';

const Projects = () => {
  const { tipo, userId, loading: loadingTipo } = useTipoUsuario();
  const navigation = useNavigation();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjetos = async () => {
    setLoading(true);
    try {
      let q;

      // Admin e Avaliador: buscam todos os projetos
      if (tipo === 'administrador' || tipo === 'avaliador') {
        q = query(collection(db, 'projetos'));
      }
      // Usuário normal: busca apenas projetos do usuário
      else if (userId) {
        q = query(
          collection(db, 'projetos'),
          where('criadoPor', '==', userId)
        );
      }

      // Só executa a consulta se for admin/avaliador ou se existir userId
      if (q) {
        const querySnapshot = await getDocs(q);
        const listaProjetos = [];
        querySnapshot.forEach((doc) => {
          listaProjetos.push({ id: doc.id, ...doc.data() });
        });
        setProjetos(listaProjetos);
      } else {
        setProjetos([]); // Caso não tenha consulta, limpa a lista
      }
    } catch (error) {
      console.log('Erro ao buscar projetos:', error);
    }
    setLoading(false);
  };

useEffect(() => {
  if (!loadingTipo) {
    console.log('Tipo de usuário:', tipo); // 👈 mostra no console
    fetchProjetos();
  }
}, [loadingTipo, userId, tipo]);


  const handleViewDetails = (item) => {
    navigation.navigate('Detalhes do Projeto', {
      projeto: item,
      // Passa a informação se o usuário pode editar
      podeEditar: tipo === 'administrador' || (tipo === 'aluno' && item.criadoPor === userId)
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'projetos', id));
      fetchProjetos(); // atualizar lista após exclusão
    } catch (error) {
      console.log('Erro ao excluir projeto:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={localStyles.item}>
      <Text style={localStyles.titulo}>{item.titulo}</Text>
      <Text>Ano: {item.ano || 'N/A'}</Text>
      <Text>Curso: {item.curso}</Text>
      <Text>Período: {item.periodo}</Text>

      <View style={localStyles.actions}>
        <TouchableOpacity
          onPress={() => handleViewDetails(item)}
          style={localStyles.iconButton}
        >
          <Icon name="visibility" size={24} color="#546A83" />
        </TouchableOpacity>

        {/* Mostra botão de deletar apenas para admin ou dono do projeto (não mostra para avaliador) */}
        {tipo !== 'avaliador' && (tipo === 'administrador' || item.criadoPor === userId) && (
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={localStyles.iconButton}
          >
            <Icon name="delete" size={24} color="#FF6347" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading || loadingTipo) {
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
        ListEmptyComponent={
          !loading && (
            <View style={localStyles.emptyContainer}>
              <Text style={localStyles.emptyText}>
                {tipo === 'aluno'
                  ? 'Você ainda não criou projetos'
                  : 'Nenhum projeto encontrado'}
              </Text>
            </View>
          )
        }
      />

      {/* {(tipo === 'administrador' || tipo === 'aluno') && (
        <TouchableOpacity
          style={localStyles.fab}
          onPress={() => navigation.navigate('Formulário de Projeto')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )} */}

       <TouchableOpacity
          style={localStyles.fab}
          onPress={() => navigation.navigate('Formulário de Projeto')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>

    </View>
  );
};

export default Projects;

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
    paddingHorizontal: 14,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});