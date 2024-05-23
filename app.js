const express = require("express");
const {success, getUniqueId} = require("./helper.js");
const { response } = require("express");
const morgan = require("morgan");
let voitures = require("./mock-voitures.js");
const {Sequelize} = require("sequelize");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// installer sequelize

const sequelize = new Sequelize(
'autoeco', 
'root', 
'', {
        host: 'localhost',
        dialect: 'mariadb',
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})



//MIDDELWARES

app.use(morgan("dev"));
app.use(bodyParser.json());
//point de terminaison

app.get("/", (req, res) => {
    res.send("Hello Vazgen");
});


//point de terminaison  de app a la base de donnee

app.get ("/api/voitures/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.query.name;
    const voiture = voitures.find(voiture => voiture.id === id);
    const message = name ? `Bonjour ${name}` : `Bonjour ${voiture.name}`;

    res.json(success(message,voiture))
})

//point de terminaison pour récuper toutes les voitures

app.get('/api/voitures', (req, res) => {
    const message =`la liste des voitures a bien été récupéré`;
    res.json(success(message, voitures))
});

//Ajouter une nouvelle voiture dans node express


  
app.post('/api/voitures', (req, res) => {
    const id = getUniqueId(voitures)
    const voitureCreated = { ...req.body, ...{id: id, created: new Date()}}
    voitures.push(voitureCreated)
    const message = `La voiture  ${voitureCreated.name} a bien été crée.`
    res.json(success(message, voitureCreated))
  });

  
   // ...mettre a jour une voiture 

app.put('/api/voitures/:id', (req, res) => {
  

    const id = parseInt(req.params.id);
    const voitureUpdated = { ...req.body, id: id }
    voitures = voitures.map(voiture => {
     return voiture.id === id ? voitureUpdated : voiture
    })
    const message = `Le véhicule  ${voitureUpdated.name} a bien été modifié.`
    res.json(success(message, voitureUpdated))

    });
    
    //Suppression d'une voiture

    /*  Supprimer une voiture */

app.delete('/api/voitures/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const voitureDeleted = voitures.find(voiture => voiture.id === id)
    voitures.filter(voiture => voiture.id !== id)
    const message = `Le vehicule ${voitureDeleted.name} a bien été supprimé.`
    res.json(success(message, voitureDeleted))
  });


app.listen(port, () => {   
    console.log(`Example app listening at http://localhost:${port}`);


})
