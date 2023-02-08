const { API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

const videogamesController = {
  getApiInfo: async function (name) {
    try {
      let games = [];
      let urlApi = name
        ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        : `https://api.rawg.io/api/games?key=${API_KEY}`;

      for (let i = 0; i < 5; i++) {
        const urlData = await axios.get(urlApi); //me guardo la informacion que me trae la peticion
        const data = urlData.data.results.map(async (e) => {
          games.push({
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            description_raw: e.description_raw,
            platforms: e.platforms.map((e) => e.platform.name),
            released: e.released,
            rating: e.rating,
            genres: e.genres.map((e) => e.name),
          });
          const platforms = e.platforms.map(async (e) =>
            Platform.findOrCreate({ where: { name: e.platform.name } })
          );
          await Promise.all(platforms); //devuelve las plataformas solo cuando se cumplio el async del map -> Promise.all
        });
        await Promise.all(data);
        urlApi = urlData.data.next;
      }
      return games;
    } catch (error) {
      return [];
    }
  },

  getDbInfo: async function (name) {
    const gamesDb = name
      ? await Videogame.findAll({
          where: { name: { [Op.iLike]: `%${name}%` } }, //busca nombre que se parezcan -> Op.iLike || //%${name}% -> busca en cualquier lugar del texto

          include: {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        })
      : await Videogame.findAll({
          include: {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
    const newGameDb = await gamesDb.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description_raw: e.description_raw,
        platforms: e.platforms,
        released: e.released,
        rating: e.rating,
        genres: e.genres.map((e) => e.name),
        background_image: e.background_image,
        createdInDb: e.createdInDb,
      };
    });
    return newGameDb;
  },

  allInfo: async function (name) {
    //creo constantes por que son funciones asincronas
    const apiInfo = await videogamesController.getApiInfo(name);
    const dbInfo = await videogamesController.getDbInfo(name);
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
  },

  getById: async function (id) {
    if (id.includes("-")) {
      const videogamejson = (
        await Videogame.findByPk(id, { include: Genre })
      ).toJSON();
      return {
        id: videogamejson.id,
        name: videogamejson.name,
        image: videogamejson.background_image,
        description_raw: videogamejson.description_raw,
        platforms: videogamejson.platforms,
        released: videogamejson.released,
        rating: videogamejson.rating,
        genres: videogamejson.genres.map((g) => g.name),
      };
    } else {
      const videogameXd = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      ).data;
      return {
        id: videogameXd.id,
        name: videogameXd.name,
        image: videogameXd.background_image,
        description_raw: videogameXd.description_raw,
        platforms: videogameXd.platforms.map((p) => p.platform.name),
        released: videogameXd.released,
        rating: videogameXd.rating,
        genres: videogameXd.genres.map((g) => g.name),
      };
    }
  },

  loadGenres: async function () {
    try {
      const urlGenres = (
        await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      ).data;
      const genreEach = urlGenres.results.map(async (g) => {
        await Genre.findOrCreate({
          where: { name: g.name },
        });
      });
      await Promise.all(genreEach);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = videogamesController;
