// services/CategorieService.ts
import axios from 'axios';
import { ICategorie } from '../models/Categorie';

// URL de ton API REST
const API_URL = 'http://192.168.1.53:3000/categories';

// Configuration d'axios avec un timeout plus long
const axiosInstance = axios.create({
    timeout: 10000, // 10 secondes
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getCategories = async (): Promise<ICategorie[]> => {
    console.log('Tentative de connexion à:', API_URL);
    try {
        console.log('Envoi de la requête GET...');
        const response = await axiosInstance.get<ICategorie[]>(API_URL);
        console.log('Réponse reçue:', response.status);
        return response.data;
    } catch (error) {
        console.log('Erreur détaillée:', error);
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                console.log('Timeout de la requête');
                throw new Error('Le serveur met trop de temps à répondre. Veuillez vérifier votre connexion.');
            }
            if (error.response) {
                console.log('Erreur serveur:', error.response.status, error.response.data);
                throw new Error(`Erreur serveur: ${error.response.status} - ${error.response.data}`);
            }
            if (error.request) {
                console.log('Pas de réponse du serveur');
                throw new Error('Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d\'exécution.');
            }
        }
        throw new Error('Une erreur inattendue s\'est produite lors de la récupération des catégories');
    }
};
  
export const createCategorie = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie", error);
      throw error;
    }
};
