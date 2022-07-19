import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Seo from "../components/Seo";

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

interface IHomeProps {
  results: IMovie[];
}

const Home: NextPage<IHomeProps> = ({ results }) => {
  return (
    <div className="container">
      <Seo title={"Home"} />

      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const { results }: { results: IMovie[] } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: { results },
  };
}
