import axios from 'axios';

const API_URL = 'http://192.168.114.152:3000';

export const getProductById = async (productId) => {
    try {
        console.log('Tentative de récupération du produit avec ID:', productId);
        
        // Si productId est 'all', on récupère tous les produits
        if (productId === 'all') {
            console.log('Récupération de tous les produits');
            const response = await axios.get(`${API_URL}/produits`);
            console.log('Réponse pour tous les produits:', response.data);
            return { data: response.data };
        }
        
        // Sinon, on récupère un produit spécifique
        console.log('Récupération du produit spécifique');
        
        // Vérifier si l'ID est valide
        if (!productId || productId === 'undefined') {
            throw new Error('ID de produit invalide');
        }

        // D'abord, essayer de récupérer tous les produits
        const response = await axios.get(`${API_URL}/produits`);
        console.log('Tous les produits:', response.data);

        // Ensuite, filtrer pour trouver le produit spécifique
        const product = response.data.find(p => p.idProduit === parseInt(productId));
        
        if (!product) {
            throw new Error(`Produit avec l'ID ${productId} non trouvé`);
        }

        console.log('Produit trouvé:', product);
        return { data: product };
    } catch (error) {
        console.error('Erreur détaillée lors de la récupération du produit:', error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Erreur serveur:', error.response.status, error.response.data);
                throw new Error(`Erreur serveur: ${error.response.status} - ${error.response.data}`);
            }
            if (error.request) {
                console.error('Pas de réponse du serveur');
                throw new Error('Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d\'exécution.');
            }
        }
        throw error;
    }
};

export const getSimilarServices = async (productId) => {
    try {
        // Pour l'instant, on retourne un tableau vide
        return { data: [] };
    } catch (error) {
        console.error('Erreur lors de la récupération des services similaires:', error);
        throw error;
    }
}; 