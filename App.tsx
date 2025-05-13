
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';

import Home from './src/screens/Home';
import Categories from './src/screens/CategoriesActivity';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Accueil') iconName = 'home-outline';
            else if (route.name === 'Catégories') iconName = 'list-outline';
            else if (route.name === 'Panier') iconName = 'cart-outline';
            else if (route.name === 'Utilisateur') iconName = 'person-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1e90ff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Catégories" component={Categories} />
        <Tab.Screen name="Panier" component={Home} />
        <Tab.Screen name="Utilisateur" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
