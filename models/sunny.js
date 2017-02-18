'use strict';

const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/iasip';
const moment = require('moment');
const fetch = require('node-fetch');

module.exports = {

  //uses the current time to select the closest episode
  itsSunnyNow: (req, res, next) => {
    let now = new Date();
    let today = now.getDay();
    //makes tomorrow or sunday if there are no more episodes in the day
    let tomorrow = today === 6 ? 1 : today + 1 ;
    //parses the time string from now to display military time
    let time = moment(now).format().split('T')[1].split('-')[0].toString();

    MongoClient.connect(dbConnection, (err, db) => {
      db.collection('episodes')
        .find({$and: [ { "day": today }, {"time": { $gte: time } } ] })
        .sort({ "time": 1 })
        .toArray((err, episode) => {
          if(typeof episode[0] === 'undefined'){
            db.collection('episodes')
              .find({ "day": tomorrow })
              .sort({ "time": 1 })
              .toArray((err, episode) => {
                console.log(episode);
                res.episode = episode[0].imdb_id;
                next();
              })
          } else {
            console.log(episode);
            res.episode = episode[0].imdb_id;
            next();
          }
      })
    })
  },

  itsSunnyLater: (req, res, next) => {
    console.log(req.query.day);
    let today = 0;
    switch(req.query.day){
      case 'Monday': today = 1;
        break;
      case 'Tuesday' : today = 2;
        break;
      case 'Wednesday' : today = 3;
        break;
      case 'Thursday' : today = 4;
        break;
      case 'Friday' : today = 5;
        break;
      default : today = 6;
        break;

    }
    console.log(today)
    //makes tomorrow or sunday if there are no more episodes in the day
    let tomorrow = today === 6 ? 1 : today + 1 ;
    //parses the time string from now to display military time
    let timeLater = req.query.ampm === 'AM' ? `${req.query.hour}:${req.query.minute}:00` : `${parseInt(req.query.hour) + 12}:${req.query.minute}:00`
    console.log(timeLater);
    MongoClient.connect(dbConnection, (err, db) => {
      db.collection('episodes')
        .find({$and: [ { "day": today }, {"time": { $gte: timeLater } } ] })
        .sort({ "time": 1 })
        .toArray((err, episode) => {
          console.log(episode);
          if(typeof episode[0] === 'undefined'){
            db.collection('episodes')
              .find({ "day": tomorrow })
              .sort({ "time": 1 })
              .toArray((err, episode) => {
                res.episode = episode[0].imdb_id;
                next();
              })
          } else {
            res.episode = episode[0].imdb_id;
            next();
          }
      })
    })
  },

  //uses the imdb_id retrieved from the psql DB to fetch from omdbapi to retrieve the rest of the data for display
  getEpisode(req, res, next) {
    let imdbId = res.episode;
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
  },

  //returns all the imdb id's for a requested season
  getSeason(req, res, next) {
    fetch(`http://www.omdbapi.com/?i=tt0472954&Season=${req.params.season}`)
    .then(r=>r.json())
    .then(epp => {
      res.season = epp.Episodes.map(ep=>{ return ep.imdbID });
      next();
    })
    .catch(error => {
      console.error('Error ', error);
      res.error = error;
      next();
    })
  }

}













