import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import { createCategorie } from '../services/CategorieService';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const AddCategorieScreen = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false, // 👈 important ! On ne veut PAS de base64
      },
      (response) => {
        if (response.didCancel) {
          console.log('Sélection annulée');
          return;
        }
  
        if (response.errorCode) {
          console.log('Erreur :', response.errorMessage);
          Alert.alert('Erreur lors du choix de l’image');
          return;
        }
  
        if (response.assets && response.assets.length > 0) {
          const picked = response.assets[0];
  
          // Vérification de l'uri
          if (!picked.uri.startsWith('file://')) {
            console.warn('URI invalide pour FormData:', picked.uri);
            Alert.alert("L'image sélectionnée est invalide pour l'envoi.");
            return;
          }
  
          setImage({
            uri: picked.uri,
            type: picked.type,
            fileName: picked.fileName,
          });
        }
      }
    );
  };
  

  const handleSubmit = async () => {
    console.log(nom)
    console.log(description)
    console.log(image)
    if (!nom || !description || !image) {
      return Alert.alert('Veuillez remplir tous les champs');
    }

    const formData = new FormData();
    
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('image', {
        uri: image.uri,
        name: image.fileName || 'image.jpg',
        type: image.type || 'image/jpeg',
      });

    try {
      const response = await createCategorie(formData);
      console.log(response)
      Alert.alert('Catégorie ajoutée avec succès');
      // Tu peux aussi rediriger ou reset les champs ici
      setNom('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur lors de l'envoi");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Nom de la catégorie"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <Button title="Choisir une image" onPress={handleChooseImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      <Button title="Ajouter la catégorie" onPress={handleSubmit} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default AddCategorieScreen;
