import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../../actions/index.js";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
//import NotFound from "../NotFound/NotFound.jsx";
import s from "./Detail.module.css";

export default function Detail(props) {
  //console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    //El useEffect se ejecuta cada vez que se modifican sus dependencias
    dispatch(getDetail(id)); //cada vez que renderiza el componente limpia el estado para que no se vea al ejecutar el sig detail
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const myVideogame = useSelector((state) => state.detail);

  return (
    <div className={s.backImg}>
      {myVideogame.name ? (
        <div>
          <h1 className={s.h1name}>{myVideogame.name}</h1>
          <img
            className={s.imgFoto}
            src={
              myVideogame.image
                ? myVideogame.image
                : myVideogame.background_image
            }
            alt=""
            width="500px"
            height="300px"
          />
          <h3 className={s.h3rating}>Rating: {myVideogame.rating}</h3>
          <p className={s.pDescription}>
            Description: {myVideogame.description_raw}
          </p>
          <p className={s.pReleased}>Released:{myVideogame.released}</p>
          <p className={s.pPlatforms}>
            Platforms: {myVideogame.platforms.join(" ")}
          </p>
          <p className={s.pGenre}>Genres: {myVideogame.genres.join(" ")}</p>
        </div>
      ) : (
        Loading
      )}
      <Link to="/home">
        {" "}
        <button className={s.botonBack}>Back</button>
      </Link>
    </div>
  );
}
