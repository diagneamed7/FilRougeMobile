import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductSearch = ({ route }) => {
  const [query, setQuery] = useState(route.params?.query || '');
  const [category, setCategory] = useState('');
  const [minPrix, setPrixMin] = useState('');
  const [maxPrix, setPrixMax] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [order, setOrder] = useState('asc');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Exemple de catégories, à remplacer par un fetch si besoin
  const categories = [
    { label: 'Toutes', value: '' },
    { label: 'Catégorie 1', value: '1' },
    { label: 'Catégorie 2', value: '2' },
  ];

  useEffect(() => {
    fetchResults();
  }, [query, category, minPrix, maxPrix, sortBy, order]);

  const fetchResults = () => {
    let url = `http://172.16.0.178:3000/produits/filtrer-trier?nom=${encodeURIComponent(query)}`;
    if (category) url += `&categorie=${category}`;
if (minPrix && !isNaN(Number(minPrix))) url += `&minPrix=${Number(minPrix)}`;
if (maxPrix && !isNaN(Number(maxPrix))) url += `&maxPrix=${Number(maxPrix)}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (order) url += `&order=${order}`;

    setLoading(true);
    axios.get(url)
      .then(res => {
        const formatted = res.data.map(item => ({
          id: item.idProduit,
          name: item.nom,
          price: `${item.prix}€`,
          image: { uri: `http://172.16.0.178:3000/uploads/${item.image}` },
        }));
        setResults(formatted);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        value={query}
        onChangeText={setQuery}
        placeholder="Rechercher un produit..."
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={setCategory}
      >
        {categories.map(cat => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <TextInput
          style={[styles.searchBar, { flex: 1, marginRight: 4 }]}
          value={minPrix}
          onChangeText={setPrixMin}
          placeholder="Prix min"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.searchBar, { flex: 1, marginLeft: 4 }]}
          value={maxPrix}
          onChangeText={setPrixMax}
          placeholder="Prix max"
          keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Picker
          selectedValue={sortBy}
          style={[styles.picker, { flex: 1, marginRight: 4 }]}
          onValueChange={setSortBy}
        >
          <Picker.Item label="Nom" value="nom" />
          <Picker.Item label="Prix" value="prix" />
        </Picker>
        <Picker
          selectedValue={order}
          style={[styles.picker, { flex: 1, marginLeft: 4 }]}
          onValueChange={setOrder}
        >
          <Picker.Item label="Ascendant" value="asc" />
          <Picker.Item label="Descendant" value="desc" />
        </Picker>
      </View>
      <Button title="Filtrer" onPress={fetchResults} />

      {loading ? (
        <Text>Recherche...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard name={item.name} price={item.price} image={item.image} />
          )}
          ListEmptyComponent={<Text>Aucun produit trouvé.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  searchBar: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 8,
    height: 40,
  },
});

export default ProductSearch;