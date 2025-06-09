import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Users from '../app/screens/Users';
import UserDetails from '../app/screens/UserDetails';
import UserForm from '../app/forms/UserForm';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Usuários" component={Users} />
      <Stack.Screen options={{headerShown: false}} name="Detalhes do Usuário" component={UserDetails} />
      <Stack.Screen options={{headerShown: false}} name="Formulário de Usuário" component={UserForm} />
    </Stack.Navigator>
  );
}
