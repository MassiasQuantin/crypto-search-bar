import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CryptoDetails from "./components/CryptoDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route principale */}
        <Route path="/" element={<SearchBar />} />
        {/* Route pour afficher les détails d'une crypto */}
        <Route path="/details/:cryptoId" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;