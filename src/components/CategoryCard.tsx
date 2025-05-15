import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  name: string;
  image: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.text}>{name}</Text>
  </TouchableOpacity>
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
});

export default CategoryCard;
