import React from "react";
import s from "./Card.module.css";

export default function Card({ name, background_image, genres, rating }) {
  return (
    <div className={s.videogameCard}>
      <h3 className={s.nameCard}>{name}</h3>
      <img className={s.imgCard} src={background_image} alt="img not found" />
      <h3 className={s.nameRating}>{rating}</h3>
      <h3 className={s.nameGenres}>{genres}</h3>
    </div>
  );
}
