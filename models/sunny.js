const pg = require('pg-promise')({});

const config = process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {

  //uses the current time to select the closest episode
  itsSunnyNow(req, res, next) {
    let today = new Date().getDay();
    _db.any(`
      SELECT *
      FROM episodes
      WHERE day = $1`, [today])
    .then(episode => {
      res.episode = episode;
      next();
    })
    .catch(error => {
      console.error('Error ', error);
      res.error = error;
      next();
    })
  }

}
