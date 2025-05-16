import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const promoData = [
  { id: '1', image: require('../types/1744884365062.png'), link: 'https://promo1.com' },
  { id: '2', image: require('../types/1744884365062.png'), link: 'https://promo2.com' },
  { id: '3', image: require('../types/1744884365062.png'), link: 'https://promo3.com' },
];

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const [topProduits, setTopProduits] = useState([]);
  const [loadingProduits, setLoadingProduits] = useState(true);
  const [errorProduits, setErrorProduits] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.114.152:3000/categories')
      .then(response => {
        const formatted = response.data.map(item => ({
          id: item.idCategorie,
          name: item.nom,
          image: { uri: `http://192.168.114.152:3000/uploads/${item.image}` },
        }));
        setCategories(formatted);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des catégories :', error);
        setErrorCategories('Impossible de charger les catégories');
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://192.168.114.152:3000/produits')
      .then(response => {
        const formatted = response.data.map(item => ({
          id: item.idProduit,
          name: item.nom,
          price: `${item.prix}€`,
          image: { uri: `http://192.168.114.152:3000/uploads/${item.image}` },
        }));
        setTopProduits(formatted);
        setLoadingProduits(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des produits:', err);
        setErrorProduits('Impossible de charger les produits');
        setLoadingProduits(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header avec barre de recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CYNA</Text>
        <TextInput
          placeholder="Rechercher"
          placeholderTextColor="#888"
          style={styles.searchBar}
        />
      </View>

      {/* Carrousel de promotions */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          autoPlay
          width={width}
          height={180}
          data={promoData}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => console.log('Promo vers:', item.link)}
              style={styles.carouselWrapper}
            >
              <Image source={item.image} style={styles.carouselImage} />
              <Text style={styles.carouselArrow}>→</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Catégories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      {loadingCategories ? (
        <Text style={{ marginLeft: 16 }}>Chargement...</Text>
      ) : errorCategories ? (
        <Text style={{ marginLeft: 16, color: 'red' }}>{errorCategories}</Text>
      ) : (
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
          renderItem={({ item }) => (
            <CategoryCard key={item.id} name={item.name} image={item.image} />
          )}
        />
      )}

      {/* Top Produits */}
      <Text style={styles.sectionTitle}>Top Produits</Text>
      {loadingProduits ? (
        <Text style={{ marginLeft: 16 }}>Chargement...</Text>
      ) : errorProduits ? (
        <Text style={{ marginLeft: 16, color: 'red' }}>{errorProduits}</Text>
      ) : (
        <FlatList
          data={topProduits}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
          renderItem={({ item }) => (
            <ProductCard key={item.id} name={item.name} price={item.price} image={item.image} />
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#002244',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  carouselContainer: {
    backgroundColor: '#f5f0e6',
    paddingVertical: 12,
    margin: 20,
    borderRadius: 5,
  },
  carouselWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
  },
  carouselArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 10,
    marginHorizontal: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  productsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

export default Home;
