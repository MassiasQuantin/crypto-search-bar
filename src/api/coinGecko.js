import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Recherche une crypto par nom
export const searchCrypto = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${query}`);
    return response.data.coins; // Retourne les résultats de la recherche
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    return [];
  }
};