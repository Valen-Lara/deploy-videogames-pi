const { Router } = require("express");
const videogames = require("./videogames.js");
const genres = require("./genres.js");
const platforms = require("./platforms.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/platforms", platforms);

module.exports = router;
