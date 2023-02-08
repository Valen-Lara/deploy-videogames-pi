import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.backImg}>
      <h1 className={s.titleLanding}>Videogames App</h1>
      <h2>
        <div className={s.btnLanding}>
          <Link to="/home">Ingresar</Link>
        </div>
      </h2>
    </div>
  );
}
