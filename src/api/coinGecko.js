import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchCrypto = async (query) => {
  try {
    await delay(1000);
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query },
    });
    return response.data.coins;
  } catch (error) {
    console.error("Erreur lors de la recherche des cryptomonnaies :", error);
    return [];
  }
};

export const getCryptoDetails = async (cryptoId) => {
  try {
    await delay(1000);
    const response = await axios.get(`${BASE_URL}/coins/${cryptoId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    return null;
  }
};

export const getHistoricalData = async (cryptoId, days = 7, currency = "usd") => {
  try {
    await delay(1000);
    const response = await axios.get(`${BASE_URL}/coins/${cryptoId}/market_chart`, {
      params: {
        vs_currency: currency,
        days,
      },
    });
    return response.data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données historiques :", error);
    return [];
  }
};