import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const promoData = [
  { id: '1', image: require('../types/1744884365062.png'), link: 'https://promo1.com' },
  { id: '2', image: require('../types/1744884365062.png'), link: 'https://promo2.com' },
  { id: '3', image: require('../types/1744884365062.png'), link: 'https://promo3.com' },
];

const categories = [
  { id: '1', name: 'Boissons', image: require('../types/1744884365062.png') },
  { id: '2', name: 'Snacks', image: require('../types/1744884365062.png') },
  { id: '3', name: 'Épices', image: require('../types/1744884365062.png') },
];

const topProduits = [
  { id: '1', name: 'Vin Rouge', price: '25€', image: require('../types/1744884365062.png') },
  { id: '2', name: 'Fromage Bio', price: '12€', image: require('../types/1744884365062.png') },
  { id: '3', name: 'Huile d’olive', price: '18€', image: require('../types/1744884365062.png') },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>

      {/* Header bleu + recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CYNA</Text>
        <TextInput
          placeholder="Rechercher"
          placeholderTextColor="#888"
          style={styles.searchBar}
        />
      </View>

      {/* Carrousel */}
      {/* Carrousel */}
<View style={styles.carouselContainer}>
  <Carousel
    loop
    autoPlay
    width={width}
    height={140}
    data={promoData}
    scrollAnimationDuration={1000}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => console.log('Promo vers:', item.link)} style={styles.carouselWrapper}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselArrow}>→</Text>
      </TouchableOpacity>
    )}
  />
</View>


      {/* Catégories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Top Produits */}
      <Text style={styles.sectionTitle}>Top Produits</Text>
      <FlatList
        data={topProduits}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsContainer}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  carouselContainer: {
  backgroundColor: '#f5f0e6', // beige doux
  paddingVertical: 12,
},
  carouselImage: {
    width: width * 0.9,
    height: 180,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 12,
  },
  categoryCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  productsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 12,
    flex: 1,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
carouselWrapper: {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
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
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 10,
},

});

export default Home;
