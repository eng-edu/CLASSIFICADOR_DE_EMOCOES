const express = require('express');
const app = express();
const bayes = require('./algoritimos/bayes');

app.get('/', function(req, res){
  res.send("API ONLINE!")
})

app.get('/analize/:frase', function (req, res) {
  var frase = req.params.frase;
  bayes.prediction(frase, function (x) {
      res.send(x);
  })
})

module.exports = app;




