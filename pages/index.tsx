import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Seo from "../components/Seo";

const API_KEY = "834be7165bcfa4410f4caefbf916cc51";

interface IMovieApiResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}

interface IMovie {
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

const Home: NextPage = () => {
  const [movies, setMovies] = useState<IMovie[]>();
  useEffect(() => {
    (async () => {
      const { results }: { results: IMovie[] } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title={"Home"} />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
