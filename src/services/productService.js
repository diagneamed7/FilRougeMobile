import axios from 'axios';

const API_URL = 'http://192.168.1.53:3000';

export const getProductById = async (productId) => {
    try {
        // Si productId est 'all', on récupère tous les produits
        if (productId === 'all') {
            const response = await axios.get(`${API_URL}/produits`);
            return { data: response.data };
        }
        
        // Sinon, on récupère un produit spécifique
        const response = await axios.get(`${API_URL}/produits/${productId}`);
        return { data: response.data };
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
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