import { useEffect, useState } from "react";
import { api } from "../services/api";
import { GenrePropsInterface } from "./interfaces/GenrePropsInterface";
import { MoviePropsInterface } from "./interfaces/MoviePropsInterface";
import { MovieCard } from "./MovieCard";

interface genreIDProps {
  selectedGenreId: number,
  // setSelectedGenreId:(id:number)=>void;
  
}

export function Content({selectedGenreId}:genreIDProps) {

  const [movies, setMovies] = useState<MoviePropsInterface[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenrePropsInterface>({} as GenrePropsInterface);



  useEffect(() => {
    api.get<MoviePropsInterface[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenrePropsInterface>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}