'use strict'
/////////////////////////////////////
/*******It's Always Sunny Now*******/
/////////////////////////////////////

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');
const { itsSunnyNow, itsSunnyLater, getEpisode, getSeason } = require('./models/sunny');
const port = process.env.PORT || 3000;

//directs server to public folder for css, js, and html
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

//return imdb id's from requested season
app.get('/season/:season', getSeason, (req, res) => {
  res.json(res.season)
})

//returns episde from mongo API
app.get('/api', itsSunnyNow, getEpisode, (req, res) =>{
  res.json(res.episode);
});

app.get('/apiLater', itsSunnyLater, getEpisode, (req, res) =>{
  res.json(res.episode);
});

//home route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

//sends a message to the console displaying the port
app.listen(port, () => {
  console.log(`server is doing its thang at ${port}`)
});
