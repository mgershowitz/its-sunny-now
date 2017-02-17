'use strict'
const dotenv = require( 'dotenv' ).config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { itsSunnyNow, getEpisode } = require('./models/sunny');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

//home route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

//This hits my sunny api route
app.get('/api', itsSunnyNow, getEpisode, (req, res) =>{
  res.json(res.episode);
});

app.listen(port, () => { console.log(`server is doing its thang at ${port}`) });
