import React from "react";
import img from "../Imagenes/loading.gif";
import s from "./Landing.module.css";

export default function Loading() {
  return (
    <div>
      <img id="img_loading" src={img} alt="Loading..." />
      <h1 className={s.loading}>Loading</h1>
    </div>
  );
}
