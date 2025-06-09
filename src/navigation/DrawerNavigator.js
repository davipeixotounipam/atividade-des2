import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../app/screens/Home';
import UserStack from './UserStack';
import ProjectStack from './ProjectStack';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ route }) {
  const tipo = route?.params?.tipo;

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} tipo={tipo} />}>
      <Drawer.Screen name="Home" component={Home} />
      {tipo === 'administrador' && <Drawer.Screen name="Usuários" component={UserStack} />}
      {(tipo === 'administrador' || tipo === 'aluno') && (
        <Drawer.Screen name="Projetos" component={ProjectStack} />
      )}
    </Drawer.Navigator>
  );
}