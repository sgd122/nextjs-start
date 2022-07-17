import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Seo from "../components/Seo";

const API_KEY = "834be7165bcfa4410f4caefbf916cc51";

const Home: NextPage = () => {
  const [movies, setMovies] = useState<any>();
  useEffect(() => {
    (async () => {
      const { results } = await (
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
      {movies?.map(
        (movie: { id: number; original_title: string; title: string }) => (
          <div key={movie.id}>
            <h4>{movie.original_title}</h4>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
