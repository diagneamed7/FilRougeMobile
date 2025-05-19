import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoCard = ({ user }) => {
if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Utilisateur inconnu</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 16,
    color: 'gray'
  }
});

export default UserInfoCard;
