//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { loadGenres, getApiInfo } = require("./src/controllers/controllers.js");
const { conn } = require("./src/db.js");
const force = false;
require("dotenv").config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: force }).then(async () => {
  const genres = await loadGenres();
  if (genres) console.log("Genres loaded");
  if (force) await getApiInfo(); //force true or false
  server.listen(PORT, () => {
    console.log("listening at", process.env.PORT); // eslint-disable-line no-console
  });
});
