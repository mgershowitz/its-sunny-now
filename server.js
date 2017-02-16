'use strict'
const dotenv = require( 'dotenv' ).config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { itsSunnyNow } = require('./models/sunny');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

app.get('/api', itsSunnyNow, (req, res) =>{
  res.json(res.episode);
});

app.listen(port, () => { console.log(`server is doing its thang at ${port}`) });
