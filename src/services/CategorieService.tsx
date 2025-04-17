// services/CategorieService.ts
import axios from 'axios';
import { ICategorie } from '../models/Categorie';

// URL de ton API REST
const API_URL = 'http://172.16.2.116:3000/categories';

export const getCategories = async (): Promise<ICategorie[]> => {
    try {
        const response = await axios.get<ICategorie[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
        throw error;
    }
};
