import React, { useRef } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { useEffect } from "react";
import { useState } from "react";
import { image_url } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function RowPost(props) {
  const navigate = useNavigate();
  const [row, setRow] = useState([]);

  const handleImageClick = async (id) => {
    localStorage.setItem("movieId", id);
    navigate("/singleMovie");
  };

  useEffect(() => {
    axios
      .get(props.urls)
      .then((response) => {
        setRow(response.data.results);
      })
      .catch((err) => {
        alert("Network error", err);
      });
  }, []);

  return (
    <div className="rowpost">
      <h2>{props.title}</h2>
      <div className="posters">
        {row.map((obj) => (
          <img
            key={obj.id}
            className={props.isSamll ? "small_poster" : "poster_image"}
            alt="poster"
            src={`${image_url + obj.backdrop_path}`}
            onClick={() => handleImageClick(obj.id)}
          />
        ))}
      </div>
    </div>
  );
}
export default RowPost;
