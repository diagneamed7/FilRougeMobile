// services/CategorieService.ts
import axios from 'axios';
import { ICategorie } from '../models/Categorie';

// URL de ton API REST
const API_URL = 'http://192.168.1.53:3000/categories';

// Configuration d'axios avec un timeout plus long
const axiosInstance = axios.create({
    timeout: 100000, // 10 secondes
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getCategories = async (): Promise<ICategorie[]> => {
    console.log('Tentative de connexion à:', API_URL);
    try {
        console.log('Envoi de la requête GET...');
        const response = await axiosInstance.get(API_URL);
        console.log('Réponse brute du serveur:', JSON.stringify(response.data, null, 2));
        
        // Transformer les données pour utiliser _id comme id
        const categories = response.data.map((category: any) => {
            console.log('Catégorie avant transformation:', JSON.stringify(category, null, 2));
            
            // Vérifier toutes les possibilités d'ID
            const categoryId = category._id || category.id || category.idCategorie;
            console.log('ID trouvé:', categoryId);
            
            if (!categoryId) {
                console.error('Aucun ID trouvé pour la catégorie:', category);
            }
            
            const transformedCategory = {
                id: categoryId,
                nom: category.nom,
                description: category.description,
                image: category.image
            };
            
            console.log('Catégorie après transformation:', JSON.stringify(transformedCategory, null, 2));
            return transformedCategory;
        });
        
        console.log('Catégories transformées finales:', JSON.stringify(categories, null, 2));
        return categories;
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
  
export const createCategorie = async (formData: FormData): Promise<ICategorie> => {
    console.log('Tentative de création de catégorie avec les données:', formData);
    try {
        console.log('Envoi de la requête POST...');
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 30000, // 30 secondes pour l'upload d'image
        });
        console.log('Réponse reçue:', response.status, response.data);
        // Transformer la réponse pour utiliser _id comme id
        return {
            id: response.data._id,
            nom: response.data.nom,
            description: response.data.description,
            image: response.data.image
        };
    } catch (error) {
        console.error("Erreur détaillée lors de la création de la catégorie:", error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(`Erreur serveur: ${error.response.status} - ${error.response.data}`);
            }
            if (error.request) {
                throw new Error('Pas de réponse du serveur. Vérifiez votre connexion.');
            }
        }
        throw new Error('Une erreur est survenue lors de la création de la catégorie');
    }
};
