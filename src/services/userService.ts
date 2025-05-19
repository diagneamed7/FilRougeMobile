export const getUserAccount = async () => {
  // Exemple de requête, adapte l’URL à ton backend
  const response = await fetch('http://192.168.1.53:3000/api/user/account');
  if (!response.ok) throw new Error('Erreur lors de la récupération du compte');
  return response.json();
};
