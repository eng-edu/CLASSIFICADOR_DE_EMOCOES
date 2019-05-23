var natural = require('natural');
var stemmer = natural.PorterStemmerPt;
var classifier = new natural.BayesClassifier(stemmer);
var fs = require('fs');

var results = JSON.parse(fs.readFileSync('base.json', 'utf-8'));

for (x = 0; x < results.length; x++) {
    classifier.addDocument(results[x].FRASE, results[x].CLASSE);
}

classifier.train();

exports.prediction = function (frase, callbeck) {
    var obj = ({
        a: classifier.getClassifications(frase),
        b: classifier.classify(frase)
    })

    callbeck(obj)
}