import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getCryptoDetails, getHistoricalData } from "../api/coinGecko";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatPrice = (price, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price);
};

const CryptoDetails = () => {
  const { cryptoId } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await getCryptoDetails(cryptoId);
      if (!details) {
        throw new Error("Détails non disponibles pour cette cryptomonnaie.");
      }
      setCryptoData(details);

      const history = await getHistoricalData(cryptoId, selectedPeriod, selectedCurrency);
      if (!history || history.length === 0) {
        throw new Error("Données historiques indisponibles.");
      }
      setHistoricalData(history);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setError("Une erreur est survenue lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  }, [cryptoId, selectedPeriod, selectedCurrency]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchData}>Réessayer</button>
      </div>
    );
  }

  if (!cryptoData || historicalData.length === 0) {
    return (
      <div>
        <p>Aucune donnée disponible pour cette cryptomonnaie.</p>
        <button onClick={fetchData}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="crypto-details">
      <h1>{cryptoData.name}</h1>
      <p>
        Symbole : {cryptoData.symbol.toUpperCase()} | Devise :{" "}
        {selectedCurrency.toUpperCase()}
      </p>
      <p>
        Prix actuel :{" "}
        {formatPrice(
          cryptoData.market_data.current_price[selectedCurrency],
          selectedCurrency
        )}
      </p>

      <div className="selectors">
        <div className="period-selector">
          <button onClick={() => setSelectedPeriod(1)}>1 jour</button>
          <button onClick={() => setSelectedPeriod(7)}>7 jours</button>
          <button onClick={() => setSelectedPeriod(30)}>30 jours</button>
          <button onClick={() => setSelectedPeriod("max")}>Tout</button>
        </div>
        <div className="currency-selector">
          <label htmlFor="currency">Devise : </label>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>
      </div>

      <div className="crypto-chart">
        <h2>
          Évolution des prix ({selectedPeriod === "max" ? "Tout" : `${selectedPeriod} jours`}) en{" "}
          {selectedCurrency.toUpperCase()}
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={historicalData.filter((item) => item.price !== null)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#8884d8", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8884d8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => formatPrice(value, selectedCurrency)}
              contentStyle={{
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "5px",
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoDetails;