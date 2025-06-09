import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import auth from '../services/credenciaisFirebaseAuth';
import { db } from '../services/credenciaisFirebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'usuarios', user.uid); 
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserName(user.nome);
                    } else {
                        setUserName(user.email); 
                    }
                } catch (error) {
                    console.error('Erro ao buscar nome do usuário:', error);
                    setUserName(user.nome); 
                }
            }
        };

        fetchUserName();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');
            })
            .catch((error) => {
                console.error('Erro ao sair:', error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.userName}>Olá, {userName || 'Usuário'}!</Text>
                </View>

                <DrawerItemList {...props} />

                <View style={{ flex: 1 }} />
            </DrawerContentScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="white" style={{ marginRight: 10 }} />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#18C0C1',
    },
    userName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: '#c1121f',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});