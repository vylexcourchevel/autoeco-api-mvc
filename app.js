const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const voitureRouter = require("./src/routes/voitures");

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());


// Sequelize
// sequelize.initDb(); // Décommentez cette ligne si vous avez une fonction initDb

//point de terminaison de la base de données

app.use ('/api/voitures', voitureRouter);




app.listen(port, () => {
  console.log(`Notre application node est démarée sur http://localhost:${port}`);
});


