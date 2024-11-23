import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Fonction pour rechercher des cryptos
export const searchCrypto = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query },
    });
    return response.data.coins; // Retourne les résultats des cryptos
  } catch (error) {
    console.error("Erreur lors de la recherche des cryptomonnaies :", error);
    return [];
  }
};

// Fonction pour obtenir les détails d'une crypto
export const getCryptoDetails = async (cryptoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${cryptoId}`);
    return response.data; // Retourne les détails complets
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    return null;
  }
};