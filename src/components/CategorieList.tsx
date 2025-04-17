// components/CategorieList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ICategorie } from '../models/Categorie';

interface CategorieListProps {
    categories: ICategorie[];
}

const CategorieList: React.FC<CategorieListProps> = ({ categories }) => {
    return (
        <View style={styles.container} >
            <FlatList
                data={categories.map(c => c.id)} // on extrait directement l’objet dans "id"
                keyExtractor={(item) => item.idCategorie.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.nom}</Text>
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
