// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesActivity from './src/screens/CategoriesActivity';
import AddCategories from './src/screens/AddCategories';
import ProductScreen from './src/screens/ProductScreen';
import { RootStackParamList } from './src/types/navigation';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.buttonText}>Voir les catégories</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Product', { productId: 'all' })}
        >
          <Text style={styles.buttonText}>Voir tous les produits</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen 
          name="Categories" 
          component={CategoriesActivity}
          options={{ title: 'Catégories' }}
        />
        <Stack.Screen 
          name="AddCategories" 
          component={AddCategories}
          options={{ title: 'Ajouter une catégorie' }}
        />
        <Stack.Screen 
          name="Product" 
          component={ProductScreen}
          options={{ title: 'Détails du produit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
