// src/components/MovieDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type MovieDetailParams = {
  id: string;
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<MovieDetailParams>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`, {
          headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        });

        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const name = movie.nameOriginal || movie.nameRu || movie.nameEn;
  const genres = movie.genres.map((item: { genre: string }) => item.genre);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <img src={movie.posterUrl} alt="movie_poster" className="w-[250px] lg:h-[400px] rounded-md" />
      <div className="text-left">
        <h2>{name}</h2>
        <p>
          <span className="font-bold">Описание:</span> <br></br> {movie.description}
        </p>
        <p>
          <span className="font-bold">Год выпуска:</span> {movie.year ?? "Недостаточно данных"}
        </p>
        <p>
          <span className="font-bold">Рейтинг:</span>{" "}
          {movie.ratingKinopoisk ?? "Недостаточно данных"}
        </p>
        <div>
          <span className="font-bold">Жанр:</span>{" "}
          <ul className="m-0 pl-8">
            {genres.map((genre: string) => <li key={genre}>{genre}</li>) ?? "Недостаточно данных"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
