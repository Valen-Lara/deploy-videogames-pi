/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={s.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={s.listaPaginado} key={number}>
              <div className={s.btnPaginado} onClick={() => paginado(number)}>
                {number}
              </div>
            </li>
          ))}
      </ul>
    </nav>
  );
}
