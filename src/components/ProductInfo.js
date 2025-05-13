import React from 'react';
import { View, Text } from 'react-native';

const ProductInfo = ({ description, features }) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={{ fontSize: 16 }}>{description}</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Caractéristiques :</Text>
    {features.map((f, idx) => (
      <Text key={idx}>• {f}</Text>
    ))}
  </View>
);

export default ProductInfo;
