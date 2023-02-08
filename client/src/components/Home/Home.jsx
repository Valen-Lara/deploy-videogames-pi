/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenre,
  getGenres,
  orderByName,
  filterByCreated,
  applyFilters,
  setCurrentPage,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const {
    loading,
    videogames,
    allVideogames,
    filterGenre,
    sortFilter,
    genres,
    filterCreated,
    page: currentPage,
  } = useSelector((state) => state);
  //console.log(allGenres);
  const [videogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage; //  7*15= 100
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 100-15= 75
  const currentVideogames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    if (!videogames[0]) dispatch(getVideogames());
    dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // el useEffect se va a ejecutar cada vez que se modifique lo del array (Ej: contar)

  useEffect(() => {
    dispatch(applyFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCreated, filterGenre, sortFilter, allVideogames]);

  function handleFilterGenre(e) {
    dispatch(filterByGenre(e.target.value));
    dispatch(setCurrentPage(1));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    dispatch(setCurrentPage(1)); //setea la pagina en la 1
  }

  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));
    dispatch(setCurrentPage(1));
  }

  //console.log(videogames);
  return (
    <div className={s.imgBack}>
      <Link className={s.btnCrear} to="/videogames">
        Create VideoGame
      </Link>
      <h1>VideoGames App</h1>

      <SearchBar setCurrentPage={setCurrentPage} />

      <div>
        {currentVideogames.length ? (
          <div className={s.divFiltros}>
            <div>
              <span className={s.spanFO}>Order by: </span>
              <select
                className={s.filterSort}
                value={sortFilter}
                onChange={(e) => handleSort(e)}
              >
                <option value="">No order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="+rating">Highest Rating</option>
                <option value="-rating">Lowest Rating</option>
              </select>
            </div>

            <div className={s.filterCreated}>
              <span className={s.spanFO}>Filter by origin: </span>
              <select
                className={s.filterSort}
                value={filterCreated}
                onChange={(e) => handleFilterCreated(e)}
              >
                <option value="">All</option>
                <option value="api">Api</option>
                <option value="db">Created</option>
              </select>
            </div>

            <div className={s.filterGenre}>
              <span className={s.spanFO}>Filter by genre: </span>
              <select
                className={s.filterSort}
                value={filterGenre}
                onChange={(e) => handleFilterGenre(e)}
              >
                <option value="">All</option>
                {genres?.map((genre) => {
                  return (
                    <option value={genre.name} key={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        ) : null}
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={videogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        <div
          className={`${s.divCards} ${
            loading || !videogames[0] ? s.loading : ""
          }`}
        >
          {loading ? (
            <Loading />
          ) : videogames[0] ? (
            currentVideogames?.map((el) => {
              return (
                <Link key={el.id} className={s.LinkCard} to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    background_image={el.background_image}
                    rating={el.rating}
                    genres={el.genres.join(" ")}
                  />
                </Link>
              );
            })
          ) : (
            <NotFound />
          )}
        </div>
      </div>

      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={videogames.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      <br />
      <br />
    </div>
  );
}
