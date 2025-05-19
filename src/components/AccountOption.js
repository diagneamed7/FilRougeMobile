import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AccountOption = ({ label, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    backgroundColor: '#e6e6e6',
    padding: 14,
    borderRadius: 6,
    marginBottom: 12
  },
  text: {
    fontSize: 16
  }
});

export default AccountOption;
