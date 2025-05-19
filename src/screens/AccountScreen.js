import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getUserAccount } from '../services/userService';
import UserInfoCard from '../components/UserInfoCard';
import AccountOption from '../components/AccountOption';

const AccountScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUserAccount();
        setUser(res.data);
      } catch (err) {
        Alert.alert("Erreur", "Impossible de charger les informations du compte.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Mon compte</Text>

      {user && <UserInfoCard user={user} />}

      <AccountOption label="Modifier mes informations" onPress={() => navigation.navigate('EditProfile')} />
      <AccountOption label="Mes abonnements" onPress={() => navigation.navigate('Subscriptions')} />
      <AccountOption label="Historique des commandes" onPress={() => navigation.navigate('OrderHistory')} />
      <AccountOption label="Mes adresses" onPress={() => navigation.navigate('Addresses')} />
      <AccountOption label="Méthodes de paiement" onPress={() => navigation.navigate('PaymentMethods')} />
    </ScrollView>
  );
};

export default AccountScreen;
