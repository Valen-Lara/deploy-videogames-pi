import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postVideogame,
  getGenres,
  getVideogames,
  getPlatforms,
} from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import s from "./Formulario.module.css";
import { useTextValidation } from "../../validaciones.js";

export default function VideoGameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { genres, platforms } = useSelector((state) => state);
  const [errors, setErrors] = useState({});

  const initialState = {
    name: "",
    background_image: "",
    rating: "",
    description_raw: "",
    released: "",
    platforms: [],
    genres: [],
  };
  const [input, setInput] = useState(initialState);

  const [changes, setChanges] = useState({
    name: false,
    background_image: false,
    rating: false,
    description_raw: false,
    released: false,
    platforms: false,
    genres: false,
  });

  const validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

  function validate(submit) {
    let errorsCopy = { ...errors };
    if (changes.name || submit) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nameValidation = useTextValidation({
        formInput: input.name,
        minLength: 5,
        maxLength: 15,
        displayText: "El nombre",
        required: true,
        regEx: /^[a-zA-Z ]*$/,
        negateRegEx: true,
        regExDisplay: "No se admiten numeros o simbolos",
      });
      typeof nameValidation === "string"
        ? (errorsCopy.name = nameValidation)
        : delete errorsCopy.name;
    }

    if (changes.background_image || submit) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const imageValidation = useTextValidation({
        formInput: input.background_image,
        displayText: "La imagen",
        regEx: validateUrl,
        regExDisplay: "No es una url valida",
        negateRegEx: true,
      });

      typeof imageValidation === "string"
        ? (errorsCopy.background_image = imageValidation)
        : delete errorsCopy.background_image;
    }

    if (changes.description_raw || submit) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const descriptionValidation = useTextValidation({
        formInput: input.description_raw,
        displayText: "La descripcion",
        maxLength: 300,
        minLength: 10,
        required: true,
      });

      typeof descriptionValidation === "string"
        ? (errorsCopy.description_raw = descriptionValidation)
        : delete errorsCopy.description_raw;
    }

    if (changes.platforms || submit) {
      if (input.platforms.length <= 0) {
        errorsCopy.platforms = "Al menos una plataforma es requerida";
      } else if (input.platforms.length > 5) {
        errorsCopy.platforms = "No pueden ser mas de 5 plataformas";
      } else delete errorsCopy.platforms;
    }

    if (changes.genres || submit) {
      if (input.genres.length <= 0) {
        errorsCopy.genres = "Al menos un genero es requerido";
      } else if (input.genres.length > 5) {
        errorsCopy.genres = "No pueden ser mas de 5 generos";
      } else delete errorsCopy.genres;
    }

    console.log(Object.values(errorsCopy));
    if (Object.keys(errorsCopy).length > 0) {
      //object.key me devuelve el nombre de la propiedad en un array
      setErrors(errorsCopy);
      return false;
    } else {
      setErrors({});
      return true;
    }
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    return () => {
      dispatch(getVideogames());
    };
  }, [dispatch]);

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setChanges({
      ...changes,
      [e.target.name]: true,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate(true)) {
      const inputCopy = { ...input };
      if (!input.background_image) delete inputCopy.background_image;
      dispatch(postVideogame(inputCopy)).then((res) => {
        if (res) {
          alert("VideoJuego creado!");
          setInput(initialState);
          history.push("/home");
        } else {
          alert("Algo ha salido mal");
        }
      });
    }
  }

  function handleSelect(e) {
    const { name, value } = e.target;
    if (input[name].includes(value)) {
      setInput({
        ...input,
        [name]: input[name].filter((p) => p !== value),
      });
      return;
    }
    if (input[name].length < 5) {
      setInput({
        ...input,
        [name]: [...input[name], value],
      });
    } else {
      alert("El maximo de plataformas es 5");
    }
    setChanges({
      ...changes,
      [name]: true,
    });
  }

  return (
    <div className={s.backImg}>
      <div>
        <Link className={s.linkBckBtn} to="/home">
          <button className={s.backBtn}>Back</button>
        </Link>
      </div>

      <h1>Create your videogame!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={s.labelShadow}>Name: </label>
          <input
            className={`${s.inputs} ${errors.name ? s.errorInput : " "}`}
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && errors.name !== " " ? <p>{errors.name}</p> : null}
        </div>

        <div>
          <label className={s.labelShadow}>Image: </label>
          <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={handleChange}
          />
          {/* {errors.background_image && <h3>{errors.background_image}</h3>} */}
          {errors.background_image && errors.background_image !== " " ? (
            <p>{errors.background_image}</p>
          ) : null}
        </div>

        <div>
          <label className={s.labelShadow}>Rating: </label>
          <input
            className={`${s.inputs} ${errors.name ? s.errorInput : " "}`}
            type="number"
            placeholder="1.0"
            step="0.01"
            min="0"
            max="5"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
          {errors.rating && <p>{errors.rating}</p>}
        </div>

        <div>
          <label className={s.labelShadow}>Description: </label>
          <textarea
            className={`${s.inputs} ${errors.name ? s.errorInput : " "}`}
            type="text"
            name="description_raw"
            onChange={handleChange}
          />
          {errors.description_raw && <p>{errors.description_raw}</p>}
        </div>

        <div>
          <label className={s.labelShadow}>Released: </label>
          <input type="date" name="released" onChange={handleChange} />
          {errors.released && <p>{errors.released}</p>}
        </div>

        <div>
          <div className={s.labelPlatform}>
            <label>Platforms:</label>
          </div>
          <div className={s.divPlatform}>
            {platforms?.map((p, i) => (
              <div className={s.selectCheck} key={i}>
                <input
                  disabled={
                    input.platforms.length === 5 && !input.platforms.includes(p)
                  }
                  type="checkbox"
                  value={p}
                  name="platforms"
                  onChange={(e) => handleSelect(e)}
                />
                <label htmlFor={p}>{p}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={s.labelPlatform}>
            <label>Genres:</label>
          </div>
          <div className={s.divGenres}>
            {genres?.map((g, i) => (
              <div className={s.selectCheck} key={i}>
                <input
                  disabled={
                    input.genres.length === 5 && !input.genres.includes(g.name)
                  }
                  type="checkbox"
                  value={g.name}
                  name="genres"
                  onChange={(e) => handleSelect(e)}
                />
                <label htmlFor={g.name}>{g.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button className={s.createbtn} type="submit">
          Create Videogame
        </button>
      </form>
    </div>
  );
}
