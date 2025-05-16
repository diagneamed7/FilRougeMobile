import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ICategorie } from '../models/Categorie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface CategorieListProps {
    categories: ICategorie[];
}

const CategorieList: React.FC<CategorieListProps> = ({ categories }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const getImageUrl = (imageName: string) => {
        const url = `http://192.168.114.152:3000/uploads/${imageName}`;
        console.log('URL de l\'image:', url);
        return url;
    };

    const handleCategoryPress = (category: ICategorie) => {
        console.log('Catégorie sélectionnée:', category);
        if (!category.id) {
            console.error('La catégorie n\'a pas d\'ID:', category);
            return;
        }
        navigation.navigate('Product', { productId: category.id });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.nom}
                renderItem={({ item }) => {
                    console.log('Rendu de la catégorie complète:', JSON.stringify(item, null, 2));
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
                                <TouchableOpacity 
                                    style={styles.productsButton}
                                    onPress={() => handleCategoryPress(item)}
                                >
                                    <Text style={styles.productsButtonText}>Voir les produits</Text>
                                </TouchableOpacity>
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
        backgroundColor: '#ddd',
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
        marginBottom: 10,
    },
    productsButton: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    productsButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CategorieList;
