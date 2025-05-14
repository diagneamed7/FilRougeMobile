import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* En-tête bleu avec titre et barre de recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Honoré</Text>
        <TextInput
          placeholder="Rechercher"
          placeholderTextColor="#888"
          style={styles.searchBar}
        />
      </View>

      {/* Section Producteurs suggérés */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Producteurs suggérés</Text>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: 'https://picsum.photos/200/100' }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Producteur Exemple</Text>
        </TouchableOpacity>
      </View>

      {/* Section Événements à venir */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Événements à venir</Text>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: 'https://picsum.photos/200/100' }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Dégustation de vins - 25 avril</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#002244',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
});
