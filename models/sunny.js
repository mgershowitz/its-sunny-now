const pg = require('pg-promise')({});
const moment = require('moment');
const fetch = require('node-fetch');

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
    let now = new Date();
    let day = now.getDay();
    //parses the time string from now to display military time
    let time = moment(now).format().split('T')[1].split('-')[0];
    console.log(time);
    _db.any(`
      SELECT imdb_id
      FROM episodes
      WHERE day = $1`, [day])
    .then(episode => {
      res.id = episode[0];
      next();
    })
    .catch(error => {
      console.error('Error ', error);
      res.error = error;
      next();
    })

  },

  //uses the imdb_id retrieved from the psql DB to fetch from omdbapi to retrieve the rest of the data for display
  getEpisode(req, res, next) {
    let imdbId = res.id.imdb_id;
    fetch(`http://www.omdbapi.com/?i=${imdbId}`)
    .then(r=>r.json())
    .then(epp => {
      res.episode = epp;
      next();
    })
    .catch(error => {
      console.error('Error ', error);
      res.error = error;
      next();
    })
  }

}














