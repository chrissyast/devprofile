const express = require('express');
const lights = require('./lights')
const { changeColour } = require('./lights')
const app = express();
// const axios = require('axios')
//var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//const dotenv = require('dotenv')
//dotenv.config({ path: '../.env' })

console.log(lights)
const port = process.env.PORT || 4000
// const backend = process.env.BACKEND_SERVER || 'http://localhost:3001'
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.post('/lights', async (req, apires, next) => {
  const {ids, ...restOfReq} = req.body
    changeColour(restOfReq, ids)
    apires.send(200)
});
app.listen(port);