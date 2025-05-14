import React from 'react';
import { View, Text, Picker } from 'react-native';

const PriceSelector = ({ prices, selected, onSelect }) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={{ fontWeight: 'bold' }}>Choisir une formule :</Text>
    <Picker selectedValue={selected} onValueChange={(item) => onSelect(item)}>
      {prices.map((p, idx) => (
        <Picker.Item key={idx} label={`${p.duration} - ${p.amount}€`} value={p} />
      ))}
    </Picker>
  </View>
);

export default PriceSelector;
