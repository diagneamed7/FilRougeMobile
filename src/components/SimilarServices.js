import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const SimilarServices = ({ services }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Services similaires</Text>
    <FlatList
      horizontal
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ marginRight: 12 }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default SimilarServices;
