import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { getProductById } from '../services/productService';

const ProductScreen = ({ route }) => {
  const { productId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Début de la récupération des produits avec ID:', productId);
      const response = await getProductById(productId);
      console.log('Données reçues:', response.data);
      
      // Vérifier si la réponse est un tableau ou un objet unique
      const productsData = Array.isArray(response.data) ? response.data : [response.data];
      console.log('Produits transformés:', productsData);
      
      setProducts(productsData);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement du produit:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Chargement des produits...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur: {error}</Text>
        <Button 
          title="Réessayer" 
          onPress={fetchData}
        />
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.errorContainer}>
        <Text>Aucun produit trouvé</Text>
        <Button 
          title="Réessayer" 
          onPress={fetchData}
        />
      </View>
    );
  }

  const getImageUrl = (imageName) => {
    return `http://192.168.1.53:3000/uploads/${imageName}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.image && (
        <Image 
          source={{ uri: getImageUrl(item.image) }}
          style={styles.image}
          onError={(error) => console.log('Erreur de chargement de l\'image:', error.nativeEvent.error)}
        />
      )}
      <Text style={styles.title}>{item.nom}</Text>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(item.prix)}</Text>
        <Text style={styles.stock}>En stock: {item.stock}</Text>
      </View>

      {item.categorie && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Catégorie:</Text>
          <Text style={styles.categoryName}>{item.categorie.nom}</Text>
        </View>
      )}

      <Button
        title="Ajouter au panier"
        onPress={() => {
          console.log("Ajouter au panier:", item);
        }}
        color="#007AFF"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.idProduit.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  listContainer: {
    padding: 20,
  },
  productCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  stock: {
    fontSize: 16,
    color: '#666',
  },
  categoryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductScreen;
