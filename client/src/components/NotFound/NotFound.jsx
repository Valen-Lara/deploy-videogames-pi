import React from "react";
import imgNF from "../Imagenes/notfound.gif";

export default function notFound() {
  return (
    <div>
      <div>
        <h1>VideoGame not found!</h1>
        <img src={imgNF} alt="VideoGame not found!" />
      </div>
    </div>
  );
}
