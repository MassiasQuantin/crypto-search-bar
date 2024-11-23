import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCryptoDetails } from "../api/coinGecko";

const CryptoDetails = () => {
  const { cryptoId } = useParams();
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoDetails(cryptoId);
      setCryptoData(data);
    };
    fetchData();
  }, [cryptoId]);

  if (!cryptoData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="crypto-details">
      <h1>{cryptoData.name}</h1>
      <p>Symbole : {cryptoData.symbol.toUpperCase()}</p>
      <p>Prix actuel : ${cryptoData.market_data.current_price.usd}</p>
      <p>Capitalisation boursière : ${cryptoData.market_data.market_cap.usd}</p>
      <p>Volume : ${cryptoData.market_data.total_volume.usd}</p>
      <p>Classement : #{cryptoData.market_data.market_cap_rank}</p>
    </div>
  );
};

export default CryptoDetails;