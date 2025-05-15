import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {

  Home: undefined;
  Categories: undefined;
  AddCategories: undefined;
  ProductScreen : undefined;
  Product: { productId: string }; // <-- à garder
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;



import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const promoData = [
  { id: '1', image: require('../types/1744884365062.png'), link: 'https://promo1.com' },
  { id: '2', image: require('../types/1744884365062.png'), link: 'https://promo2.com' },
  { id: '3', image: require('../types/1744884365062.png'), link: 'https://promo3.com' },
];

const PromoCarousel = () => {
  return (

  );
};

const styles = StyleSheet.create({
  
});

export default PromoCarousel;
