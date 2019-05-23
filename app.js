http://minerandodados.com.br/index.php/2017/03/15/analise-de-sentimentos-twitter-como-fazer/

const express = require('express');
const app = express();
const io = require('./server/serverSocket');
const bayes = require('./algoritimos/bayes');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile("index.html");
})

app.get('/analize/:frase', function (req, res) {

  var frase = req.params.frase;

  bayes.prediction(frase, function (x) {

    var raw = x.a

    var obj = {
      raw: raw,
      frase: frase
    }

    io.emit("data", obj);

    console.log('------------------------------------------------------')
    console.log('ANALISE -- frase: ' + frase + ' - classificada como: ' + x.b)

    res.status(200).json({ result: x.b, classificação: raw });
    console.log('------------------------------------------------------')
  })

})



module.exports = app;




