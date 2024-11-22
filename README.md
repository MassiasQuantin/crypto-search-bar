# CryptoSearch Bar

Une application web intuitive construite avec **React** pour rechercher des cryptomonnaies en temps réel. Inspirée par l'expérience `Cmd + P` sur macOS, cette application offre une recherche rapide et élégante avec des détails précis sur chaque cryptomonnaie.

---

## 🚀 Fonctionnalités

- 🔍 **Recherche en temps réel** des cryptomonnaies via l'API CoinGecko.
- 📊 **Affichage des détails** d'une cryptomonnaie, y compris :
  - Nom
  - Symbole
  - Prix actuel
  - Capitalisation boursière
  - Volume d'échange
- 📈 **Graphique de l'évolution des prix** sur 7 ou 30 jours.
- ⚡ **Interface rapide et épurée** avec navigation clavier et souris.
- 🌙 **Mode sombre et clair** (à venir).

---

## 🛠️ Technologies utilisées

### Frontend

- **React** : Framework JS pour construire l'interface utilisateur.
- **SCSS** : Gestion avancée des styles.
- **Axios** : Pour les appels API.
- **React Chart.js 2** : Pour afficher les graphiques.

### API

- **CoinGecko API** : Fournit les données en temps réel sur les cryptomonnaies.

---

## 📂 Structure du projet
crypto-search-bar/
├── public/               # Fichiers statiques
│   └── index.html        # Point d’entrée HTML
├── src/                  # Code source principal
│   ├── components/       # Composants réutilisables
│   │   ├── SearchBar.jsx
│   │   ├── CryptoDetails.jsx
│   │   └── Chart.jsx
│   ├── styles/           # Fichiers SCSS
│   │   ├── main.scss
│   │   ├── components/
│   │   │   ├── searchBar.scss
│   │   │   ├── cryptoDetails.scss
│   │   │   └── chart.scss
│   │   └── _variables.scss
│   ├── api/              # Fichiers pour les appels API
│   │   └── coinGecko.js
│   ├── App.js            # Composant principal
│   ├── App.scss          # Styles globaux
│   └── index.js          # Point d’entrée JS
├── .gitignore            # Fichiers et dossiers ignorés par Git
├── package.json          # Dépendances et scripts du projet
└── README.md             # Documentation
