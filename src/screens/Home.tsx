import React from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const promoData = [
  { id: '1', image: require('../types/1744884365062.png'), link: 'https://promo1.com' },
  { id: '2', image: require('../types/1745235907115.jpeg'), link: 'https://promo2.com' },
  { id: '3', image: require('../types/1744884365062.png'), link: 'https://promo3.com' },
];

const Home = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
      {/* Nouveau carrousel fonctionnel */}
      <Carousel
        loop
        width={width}
        height={160}
        autoPlay={true}
        data={promoData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log('Link:', item.link)}>
            <Image
              source={item.image}
              style={{ width: width * 0.9, height: 160, borderRadius: 10, alignSelf: 'center' }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default Home;
