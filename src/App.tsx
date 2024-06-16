// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetail from "./components/MovieDetail";
import Favorites from "./components/Favorites";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Movie Search App</h1>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
