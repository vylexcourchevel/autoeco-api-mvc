const express = require("express");
const { success, getUniqueId } = require("./helper.js");
const { response } = require("express");
const morgan = require("morgan");
let voitures = require("./mock-voitures.js");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const VoitureModel = require("./src/models/voitures.js");
const ReservationModel = require("./src/models/reservation.js");
const UserModel = require("./src/models/user.js");

const app = express();
const port = 3006;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

async function main() {
    // Connexion à la base de données
    const connection = new Sequelize(
        'autoeco', 
        'root', 
        '', 
        {
            host: 'localhost',
            dialect: 'mariadb',
        }
    );

    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return;
    }

    // Initialisation des modèles
    VoitureModel(connection, Sequelize);
    ReservationModel(connection, Sequelize);
    UserModel(connection, Sequelize);

    const {
        User,
        Reservation,
        Voiture
    } = connection.models;

    // Définition des relations entre les modèles
    User.hasMany(Reservation, { as: "reservations" });
    Reservation.belongsTo(User);

    Voiture.hasMany(Reservation, { as: "reservations" });
    Reservation.belongsTo(Voiture);

    // Synchronisation avec la base de données
    await connection.sync();
    console.log('Synchro OK');

    // Exportation des modèles
    module.exports = {
        User,
        Reservation,
        Voiture
    };

    connection.sync({ force: true })
        .then(_ => console.log('La table de données a bien été créée'));

    // Points de terminaison

    app.get("/", (req, res) => {
        res.send("Hello Vazgen");
    });

    app.get("/api/voitures/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const name = req.query.name;
        const voiture = voitures.find(voiture => voiture.id === id);
        const message = name ? `Bonjour ${name}` : `Bonjour ${voiture.name}`;

        res.json(success(message, voiture));
    });

    app.get('/api/voitures', (req, res) => {
        const message = `La liste des voitures a bien été récupérée.`;
        res.json(success(message, voitures));
    });

    app.post('/api/voitures', (req, res) => {
        const id = getUniqueId(voitures);
        const voitureCreated = { ...req.body, id: id, created: new Date() };
        voitures.push(voitureCreated);
        const message = `La voiture ${voitureCreated.name} a bien été créée.`;
        res.json(success(message, voitureCreated));
    });

    app.put('/api/voitures/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const voitureUpdated = { ...req.body, id: id };
        voitures = voitures.map(voiture => {
            return voiture.id === id ? voitureUpdated : voiture;
        });
        const message = `Le véhicule ${voitureUpdated.name} a bien été modifié.`;
        res.json(success(message, voitureUpdated));
    });

    app.delete('/api/voitures/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const voitureDeleted = voitures.find(voiture => voiture.id === id);
        voitures = voitures.filter(voiture => voiture.id !== id);
        const message = `Le véhicule ${voitureDeleted.name} a bien été supprimé.`;
        res.json(success(message, voitureDeleted));
    });

    app.listen(port, () => {   
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

// Appel de la fonction principale
main();
