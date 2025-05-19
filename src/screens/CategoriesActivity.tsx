import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { getCategories } from '../services/CategorieService';
import { ICategorie } from '../models/Categorie';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

const CategoriesActivity: React.FC = () => {
  const [categories, setCategories] = useState<ICategorie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError(`Erreur lors du chargement des catégories : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getImageUrl = (imageName: string) => `http://192.168.1.53:3000/uploads/${imageName}`;

  const handleCategoryPress = (category: ICategorie) => {
    if (!category.id) {
      console.error("ID de catégorie manquant :", category);
      return;
    }
    navigation.navigate('Product', { productId: category.id });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id || item.nom}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Catégories</Text>
            <TouchableOpacity
              style={styles.productsButton}
              onPress={() => navigation.navigate('Product', { productId: 'all' })}
            >
              <Text style={styles.productsButtonText}>Voir tous les produits</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: getImageUrl(item.image) }}
              style={styles.image}
              onError={(error) => console.log("Erreur image :", error.nativeEvent.error)}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.nom}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.productsButton} onPress={() => handleCategoryPress(item)}>
                <Text style={styles.productsButtonText}>Voir les produits</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCategories')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 100 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 18 },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  productsButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  productsButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: { fontSize: 30, color: 'white', fontWeight: 'bold' },
});

export default CategoriesActivity;
