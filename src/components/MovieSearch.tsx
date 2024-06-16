// src/components/MovieSearch.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(1);
  const [year, setYear] = useState([1990, 2024]);
  const [rating, setRating] = useState([0, 10]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    searchMovies();
  }, [page]);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleYearRange = (event: Event, newValue: number | number[], activeThumb: number) => {
    const minDistance = 5;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setYear([Math.min(newValue[0], year[1] - minDistance), year[1]]);
    } else {
      setYear([year[0], Math.max(newValue[1], year[0] + minDistance)]);
    }
  };

  const handleRatingRange = (event: Event, newValue: number | number[], activeThumb: number) => {
    const minDistance = 0.5;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRating([Math.min(newValue[0], rating[1] - minDistance), rating[1]]);
    } else {
      setRating([rating[0], Math.max(newValue[1], rating[0] + minDistance)]);
    }
  };

  const searchMovies = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}?keyword=${encodeURIComponent(
          query
        )}&genres=${genre}&ratingFrom=${rating[0]}&ratingTo=${rating[1]}&yearFrom=${
          year[0]
        }&yearTo=${year[1]}&page=${page}`,
        {
          headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log(response.data);
      setTotalPages(response.data.totalPages);
      setMovies(response.data.items);
    } catch (error) {
      console.error("Error fetching the movies:", error);
    }
  };

  return (
    <div>
      <div className="relative w-full flex justify-center">
        <form onSubmit={searchMovies} className="max-w-[300px] flex flex-col gap-2">
          <div className="flex justify-center items-center gap-2">
            <TextField
              id="outlined-basic"
              label="Название"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите название фильма"
            />

            <Button variant="contained" type="submit" size="large">
              Поиск
            </Button>
          </div>
          <FormControl className="w-[200px]">
            <InputLabel id="select-label">Жанр</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={genre}
              label="Жанр"
              onChange={(e) => setGenre(Number(e.target.value))}
              className="text-left"
            >
              <MenuItem value={1}>Триллер</MenuItem>
              <MenuItem value={2}>Драма</MenuItem>
              <MenuItem value={3}>Криминал</MenuItem>
              <MenuItem value={4}>Мелодрама</MenuItem>
              <MenuItem value={5}>Детектив</MenuItem>
              <MenuItem value={6}>Фантастика</MenuItem>
            </Select>
          </FormControl>

          <Typography className="text-left mt-5">Год выпуска</Typography>
          <Slider
            value={year}
            onChange={handleYearRange}
            valueLabelDisplay="auto"
            disableSwap
            step={5}
            marks
            min={1990}
            max={2024}
          />

          <Typography className="text-left mt-5">Рейтинг</Typography>
          <Slider
            value={rating}
            onChange={handleRatingRange}
            valueLabelDisplay="auto"
            disableSwap
            step={0.5}
            marks
            min={0}
            max={10}
          />
        </form>
        <Button href="/favorites" variant="contained" className="absolute right-0">
          Избранные
        </Button>
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        {movies.length > 0 ? (
          movies.map((movie) => <Movie key={movie.kinopoiskId} movie={movie} />)
        ) : (
          <h3 className="w-full text-center mt-10">Фильмы не найдены</h3>
        )}
      </div>
      {movies.length > 0 && totalPages > 1 && (
        <div className="mt-20 flex justify-center">
          <Pagination count={totalPages} page={page} onChange={handlePaginationChange} />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
