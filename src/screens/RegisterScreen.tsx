 import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.53:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l’inscription');
      }

      const data = await response.json();
      Alert.alert('Succès', 'Compte créé avec succès. Scanne le QR Code avec ton app MFA.');

      setQrCode(data.qrCode);
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="S'inscrire" onPress={handleRegister} />

      {qrCode && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>Scanne ce QR Code avec Google Authenticator :</Text>
          <Image source={{ uri: qrCode }} style={styles.qrImage} />
        </View>
      )}

      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        Tu as déjà un compte ? Connecte-toi
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  loginLink: {
    marginTop: 24,
    textAlign: 'center',
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
