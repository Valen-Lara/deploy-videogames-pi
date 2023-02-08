import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterByCreated,
  filterByGenre,
  getVideogameName,
  getVideogames,
  orderByName,
  setCurrentPage,
} from "../../actions/index.js";
import s from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault(); //Cancela la acción del evento
    setName(e.target.value); //modifica el estado, cada vez que modifique el input de la search bar
    //console.log(name)
  }

  // function del button
  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(orderByName(""));
      dispatch(filterByGenre(""));
      dispatch(filterByCreated(""));
      dispatch(getVideogameName(name));
      dispatch(setCurrentPage(1));
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setName("");
    dispatch(getVideogames());
    dispatch(setCurrentPage(1));
  }

  return (
    <div>
      <div className={s.divSearchBar}>
        <input
          type="text"
          placeholder="Search..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className={s.btnPadd}>
        <button
          className={s.btnRB}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
        <button
          className={s.btnRB}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
