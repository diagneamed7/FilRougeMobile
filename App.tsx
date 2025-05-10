// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesActivity from './src/screens/CategoriesActivity';
import AddCategories from './src/screens/AddCategories';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
