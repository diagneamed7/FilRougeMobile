import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { ICategorie } from '../models/Categorie';

interface CategorieListProps {
    categories: ICategorie[];
}

const CategorieList: React.FC<CategorieListProps> = ({ categories }) => {
    const getImageUrl = (imageName: string) => {
        const url = `http://192.168.1.53:3000/uploads/${imageName}`;
        console.log('URL de l\'image:', url);
        return url;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.nom}
                renderItem={({ item }) => {
                    console.log('Rendu de la catégorie:', item);
                    return (
                        <View style={styles.item}>
                            <Image 
                                source={{ uri: getImageUrl(item.image) }}
                                style={styles.image}
                                onError={(error) => console.log('Erreur de chargement de l\'image:', error.nativeEvent.error)}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.nom}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    );
                }}
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
        flexDirection: 'row',
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#ddd', // Couleur de fond pour voir la zone de l'image
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default CategorieList;
