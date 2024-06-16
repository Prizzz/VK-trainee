// src/components/Favorites.tsx
import React, { useEffect, useState } from "react";
import Movie from "./Movie";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites">
      <h2>Избранные фильмы</h2>
      <div className="flex flex-wrap gap-5 mt-5">
        {favorites.length === 0 ? (
          <h3 className="w-full text-center">Нет избранных фильмов</h3>
        ) : (
          favorites.map((movie) => (
            <Movie key={movie.kinopoiskId} movie={movie} setFavorites={setFavorites} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
