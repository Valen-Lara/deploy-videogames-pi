const { Router, request } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { allInfo, getById } = require("../controllers/controllers");
const { API_KEY } = process.env;
const router = Router();

////////////////////////RUTAS////////////////////////////////

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const allGames = await allInfo(name); //alGames es un array de objetos

    return allGames
      ? res.status(200).send(allGames)
      : res.status(404).send("Juego no encontrado");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; //params siempre me trae la informacion en string
  //console.log(id);
  try {
    return res.send(await getById(id));
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    description_raw,
    released,
    rating,
    background_image,
    platforms,
    createdInDb,
    genres,
  } = req.body;
  if (!name || !description_raw || !platforms) {
    return res.status(404).send({ message: "Faltan datos obligatorios" });
  }

  try {
    let newGame = await Videogame.create({
      name,
      description_raw,
      released,
      rating,
      background_image,
      platforms,
      createdInDb,
    });
    //console.log(newGame)

    let genresDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    newGame.addGenre(genresDb);
    res.status(200).send("Juego creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
