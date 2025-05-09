import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { createCategorie } from '../services/CategorieService';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

interface ImageType {
  uri: string;
  type?: string;
  fileName?: string;
}

const AddCategorieScreen = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImageType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Sélection annulée');
          return;
        }
  
        if (response.errorCode) {
          console.log('Erreur :', response.errorMessage);
          Alert.alert('Erreur', 'Erreur lors du choix de l\'image');
          return;
        }
  
        if (response.assets && response.assets.length > 0) {
          const picked = response.assets[0];
  
          if (!picked.uri.startsWith('file://')) {
            console.warn('URI invalide pour FormData:', picked.uri);
            Alert.alert('Erreur', 'L\'image sélectionnée est invalide pour l\'envoi.');
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

  const validateForm = () => {
    if (!nom.trim()) {
      Alert.alert('Erreur', 'Le nom est requis');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'La description est requise');
      return false;
    }
    if (!image) {
      Alert.alert('Erreur', 'Une image est requise');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    const formData = new FormData();
    
    formData.append('nom', nom.trim());
    formData.append('description', description.trim());
    formData.append('image', {
      uri: image.uri,
      name: image.fileName || 'image.jpg',
      type: image.type || 'image/jpeg',
    } as any);

    try {
      const response = await createCategorie(formData);
      Alert.alert('Succès', 'Catégorie ajoutée avec succès');
      // Reset form
      setNom('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de la catégorie'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Ajout en cours...</Text>
      </View>
    );
  }

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
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
      />

      <Button title="Choisir une image" onPress={handleChooseImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      <Button 
        title="Ajouter la catégorie" 
        onPress={handleSubmit} 
        color="green"
        disabled={loading}
      />
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
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCategorieScreen;
