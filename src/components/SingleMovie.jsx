import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_KEY } from "../constants/constants";

const SingleMovie = () => {
  const id = localStorage.getItem("movieId");

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const trailerRef = useRef();


  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setMovieDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch movie details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
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

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const trailerData = response.data.results.find(
        (data) => data.type === "Trailer" && data.site === "YouTube"
      );
      setTrailer(trailerData);
    } catch (error) {
      console.error("Error fetching movie trailer:", error.message);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { backdrop_path, title, release_date, runtime, overview } =
    movieDetails;

  const backgroundImage = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  const containerStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    maxWidth: "1200px",
    width: "100%",
  };

  const textContainerStyle = {
    flex: 1,
    paddingRight: "20px",
  };

  const titleStyle = {
    fontSize: "4rem",
    marginBottom: "20px",
    fontWeight: "bold",
  };

  const overviewStyle = {
    fontSize: "1.2rem",
    marginBottom: "20px",
  };

  const detailsContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const detailStyle = {
    fontSize: "1.2rem",
    marginBottom: "10px",
  };

  const detailLabelStyle = {
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    alignSelf: "flex-start",
  };

  
  

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={textContainerStyle}>
          <h1 style={titleStyle}>{title}</h1>
          <p style={overviewStyle}>{overview}</p>
          <button style={buttonStyle} onClick={handleButtonClick}>
            Trailer
          </button>
        </div>
        <div style={detailsContainerStyle}>
          <p style={detailStyle}>
            <span style={detailLabelStyle}>Release Date:</span> {release_date}
          </p>
          <p style={detailStyle}>
            <span style={detailLabelStyle}>Runtime:</span> {runtime} minutes
          </p>
        </div>
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
    </div>
  );
};

export default SingleMovie;
