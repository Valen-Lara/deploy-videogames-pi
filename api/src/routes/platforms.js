const { Router } = require("express");
const { Platform } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allPlatforms = await Platform.findAll(); //me devuleve un array con toda la info del modelo
    const platformJson = allPlatforms.map((p) => p.toJSON());
    res.send(platformJson.map((p) => p.name));
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
