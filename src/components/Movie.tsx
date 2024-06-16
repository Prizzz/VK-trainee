// src/components/Movie.tsx
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";

interface MovieProps {
  movie: {
    kinopoiskId: number;
    nameOriginal: string | null;
    nameRu: string | null;
    nameEn: string | null;
    posterUrl: string;
    ratingKinopoisk: number;
    year: number;
  };
  setFavorites?: (value: any[]) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, setFavorites }) => {
  const location = useLocation();
  const isFavorites = location.pathname !== "/favorites" ? false : true;
  const name = movie.nameOriginal || movie.nameRu || movie.nameEn;

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const movieData = {
      kinopoiskId: movie.kinopoiskId,
      name: name,
      posterUrl: movie.posterUrl,
      year: movie.year,
      ratingKinopoisk: movie.ratingKinopoisk,
    };

    if (!favorites.find((fav: any) => fav.kinopoiskId === movie.kinopoiskId)) {
      favorites.push(movieData);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  const removeFromFavorites = () => {
    if (setFavorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updatedFavorites = favorites.filter(
        (favoriteMovie: any) => favoriteMovie.kinopoiskId !== movie.kinopoiskId
      );

      setFavorites(updatedFavorites);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <Card className="flex flex-col justify-between w-[300px]">
      <CardContent>
        <h2>{name}</h2>
        <img src={movie.posterUrl} alt="movie_poster" className="w-[200px] rounded-md" />
        <p>
          <span className="font-bold">Год выпуска:</span> {movie.year ?? "Недостаточно данных"}
        </p>
        <p>
          <span className="font-bold">Рейтинг:</span>{" "}
          {movie.ratingKinopoisk ?? "Недостаточно данных"}
        </p>
      </CardContent>
      <CardActions className="justify-between">
        <Button size="medium" href={`/movies/${movie.kinopoiskId}`}>
          Подробнее
        </Button>

        <Button
          size="medium"
          color={isFavorites ? "error" : "warning"}
          onClick={isFavorites ? removeFromFavorites : addToFavorites}
        >
          {isFavorites ? "Удалить" : "В избранное"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movie;
