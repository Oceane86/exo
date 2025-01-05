// Importation des modules
var express = require('express');
var app = express();

// Importation de CORS (pour les tests externes)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir les fichiers statiques (comme le fichier CSS)
app.use(express.static('public'));

// Servir la page HTML principale (index.html)
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API pour gérer les requêtes de timestamp
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // Si un paramètre de date est fourni
  if (dateParam) {
    // Si c'est un timestamp Unix (numérique), le traiter comme un nombre
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Sinon, traiter comme une chaîne de date
      date = new Date(dateParam);
    }

    // Vérifier si la date est invalide
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  } else {
    // Si aucune date n'est fournie, utiliser la date actuelle
    date = new Date();
  }

  // Récupérer le timestamp Unix et la date UTC
  const unixTimestamp = date.getTime();
  const utcDate = date.toUTCString();

  // Retourner la réponse JSON avec les clés unix et utc
  return res.json({ unix: unixTimestamp, utc: utcDate });
});

// Lancer l'application sur le port spécifié ou sur le port 3000 par défaut
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
