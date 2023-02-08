const { Router } = require("express");
const { Genre } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.findAll();
    res.send(allGenres);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
