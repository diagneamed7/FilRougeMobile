import React from 'react';
import { ScrollView, Image, View, Dimensions } from 'react-native';

const ProductCarousel = ({ images }) => {
  const width = Dimensions.get('window').width;

  return (
    <ScrollView horizontal pagingEnabled>
      {images.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={{ width, height: 200, resizeMode: 'cover' }}
        />
      ))}
    </ScrollView>
  );
};

export default ProductCarousel;
