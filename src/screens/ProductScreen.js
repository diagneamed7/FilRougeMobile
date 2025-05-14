import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { getProductById } from '../services/productService';

const ProductScreen = ({ route }) => {
  const { productId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(productId);
        setProducts(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (!products.length) return <Text>Produit non trouvé</Text>;

  const getImageUrl = (imageName) => {
    return `http://192.168.1.53:3000/uploads/${imageName}`;
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.image && (
        <Image 
          source={{ uri: getImageUrl(item.image) }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{item.nom}</Text>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.prix}€</Text>
        <Text style={styles.stock}>En stock: {item.stock}</Text>
      </View>

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
        keyExtractor={(item) => item.idProduit}
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
});

export default ProductScreen;
