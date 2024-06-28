import React, { useEffect, useState, useRef } from "react";
import { API_KEY, image_url } from "../../constants/constants";
import axios from "axios";
import "./Banner.css";
import RowPost from "../rowPost/RowPost";
import {
  HorrorMovies,
  action,
  adventure,
  animation,
  comedy,
  history,
  thriller,
} from "../../urls";
import NavBar from "../navBar/NavBar";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const trailerRef = useRef();

  const handlePlayMovie = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const trailerData = response.data.results.find(
        (data) => data.type === "Trailer" && data.site === "YouTube"
      );
      setTrailer(trailerData);
    } catch (error) {
      console.error("Error fetching movie trailer:", error.message);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const randomNum = Math.floor(Math.random() * 10);
        setMovie(response.data.results[randomNum]);
      } catch (error) {
        console.error("Error fetching trending movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (trailerRef.current && !trailerRef.current.contains(event.target)) {
        setTrailer(null);
      }
    };

    if (trailer) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trailer]);

  return (
    <>
      <NavBar />
      <div
        className="banner"
        style={{
          backgroundImage: `url(${
            movie ? image_url + movie.backdrop_path : ""
          })`,
          position: "relative",
        }}
      >
        <div className="content">
          <h1 className="title">{movie ? movie.title || movie.name : ""}</h1>
          <div className="banner_buttons">
            <button
              className="button"
              onClick={() => handlePlayMovie(movie.id)}
            >
              Play
            </button>
            <button className="button">My List</button>
          </div>
          <h1 className="discription">{movie ? movie.overview : ""}</h1>
        </div>
        {trailer && (
          <div
            ref={trailerRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ color: "#fff" }}>{trailer.name}</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className="fade_bottom"></div>
        <RowPost title="Adventure" isSmall urls={adventure} />
        <RowPost title="Action" isSmall urls={action} />
        <RowPost title="HorrorMovies" isSmall urls={HorrorMovies} />
        <RowPost title="Animation" isSmall urls={animation} />
        <RowPost title="History" isSmall urls={history} />
        <RowPost title="Thriller" isSmall urls={thriller} />
        <RowPost title="Comedy" isSmall urls={comedy} />
      </div>
    </>
  );
}

export default Banner;
