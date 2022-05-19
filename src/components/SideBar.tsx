import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { GenrePropsInterface } from "./interfaces/GenrePropsInterface";

interface genreIDProps {
  setSelectedGenreId: (id:number)=>void,
  selectedGenreId: number,
  // setSelectedGenreId:(id:number)=>void;
  
}


export function SideBar({setSelectedGenreId,selectedGenreId}:genreIDProps) {
  const [genres, setGenres] = useState<GenrePropsInterface[]>([]);


  useEffect(() => {
    api.get<GenrePropsInterface[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )

}