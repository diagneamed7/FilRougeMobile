import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddCategorieScreen from './src/screens/AddCategories';
import AccountScreen from './src/screens/AccountScreen';
import Home from './src/screens/Home';
import Categories from './src/screens/CategoriesActivity';
import ProductScreen from './src/screens/ProductScreen';
import { Text, View } from 'react-native';
import UserStack from './src/navigation/UserNavigator';
import { getCategories } from './src/services/CategorieService';
import ProductSearch from './src/screens/ProductSearch';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<any>();


function TabNavigator() {
  return (
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
      <Tab.Screen name="Utilisateur" component={UserStack} />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ title: 'Détails du produit' }}
        />
        <Stack.Screen
          name="AddCategorie"
          component={AddCategorieScreen}
          options={{ title: 'Ajouter une catégorie' }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ title: 'Mon compte' }}
        />
        <Stack.Screen 
          name="ProductSearch" 
          component={ProductSearch} 
          options={{ title: 'Recherche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
