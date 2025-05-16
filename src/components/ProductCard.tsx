import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProductCardProps {
  name: string;
  price: string;
  image: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 85,
    height: 80,
    borderRadius: 10,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ProductCard;
