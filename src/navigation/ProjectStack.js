import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Projects from '../app/screens/Projects';
import ProjectDetails from '../app/screens/ProjectDetails';
import ProjectForm from '../app/forms/ProjectForm';

const Stack = createNativeStackNavigator();

export default function ProjectStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Projetos" component={Projects} />
      <Stack.Screen options={{headerShown: false}} name="Detalhes do Projeto" component={ProjectDetails} />
      <Stack.Screen options={{headerShown: false}} name="Formulário de Projeto" component={ProjectForm} />
    </Stack.Navigator>
  );
}
