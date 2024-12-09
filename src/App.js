import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CryptoDetails from "./components/CryptoDetails";

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundImage: "url('/25101.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/details/:cryptoId" element={<CryptoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;