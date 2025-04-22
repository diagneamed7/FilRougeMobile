import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { ICategorie } from '../models/Categorie';

interface CategorieListProps {
    categories: ICategorie[];
}

const CategorieList: React.FC<CategorieListProps> = ({ categories }) => {
    return (
        <View style={styles.container}>
            <FlatList
<<<<<<< HEAD
                data={categories} // Utilisation des catégories passées en props
                keyExtractor={(item) => item.id.idCategorie.toString()} // Correction : accès à id.idCategorie
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.id.nom}</Text> {/* Correction : accès à item.id.nom */}
=======
                data={categories}
                keyExtractor={(item) =>item.nom}
                renderItem={({ item}) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.nom}</Text>
                        <Text>{item.description}</Text>
                        <Image source={{ uri: `http://10.188.180.66:3000/uploads/${item.image}` }}
  style={{ width: 100, height: 100, borderRadius: 10 }}
/>

>>>>>>> bdbb6b3 (Affichage catégorie avec image et ajout catégorie)
                    </View>
                )}    
    
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    item: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategorieList;
