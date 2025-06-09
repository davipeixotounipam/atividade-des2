import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/screens/Login';
import DrawerNavigator from './DrawerNavigator';
import ProjectDetails from '../app/screens/ProjectDetails'; // <-- importar a tela

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeDrawer">
        {(props) => <DrawerNavigator {...props} />}
      </Stack.Screen>
      
      {/* Tela de detalhes do projeto */}
      <Stack.Screen
        name="Detalhes do Projeto"
        component={ProjectDetails}
        options={{ headerShown: true, title: 'Detalhes do Projeto' }}
      />
    </Stack.Navigator>
  );
}
