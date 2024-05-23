const express = require("express");
const { success, getUniqueId } = require("./helper.js");
const morgan = require("morgan");
const { Sequelize, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const VoitureModel = require("./src/models/voitures.js");
const ReservationModel = require("./src/models/reservation.js");
const UserModel = require("./src/models/user.js");
let voitures = require("./mock-voitures.js");

const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());


    // Connexion à la base de données
    const sequelize = new Sequelize(
        'autoeco', 
        'root', 
        '', 
    {
        host: 'localhost',
        dialect: 'mariadb',
        }
    );

    sequelize.authenticate()
    .then(_=> console.log('Connexion au serveur de base de données reussie'))
    .catch(error => console.log(`Connexion au serveur de base de données echouée${error}`))



    // Initialisation des modèles
    VoitureModel(sequelize, Sequelize);
    ReservationModel(sequelize, Sequelize);
    UserModel(sequelize, Sequelize);

    const {
        User,
        Reservation,
        Voiture
    } = sequelize.models;

    // Définition des relations entre les modèles
    User.hasMany(Reservation, { as: "reservations" });
    Reservation.belongsTo(User);

    Voiture.hasMany(Reservation, { as: "reservations" });
    Reservation.belongsTo(Voiture);

    // Synchronisation avec la base de données
    sequelize.sync({ force: true })
    .then(_ => {
        console.log('La table de données a bien été créée')

        Voiture.create({
            name : 'Peugeot',
            model : 2008,
            fuelType : 'essence',
            price : 14000 ,
            kilometre : 86000 ,
            category : 'SUV',
            year : 2016,
            picture : '../images/peugeot/3008.jpg',
            available : true
        }).then(Peugeot => 
            console.log(Peugeot.toJSON()))
        })
    
    

    //Exportation des modèles
    // module.exports = {
    //     User,
    //     Reservation,
    //     Voiture
    // };

    // Points de terminaison
    app.get("/", (req, res) => {
        res.send("Hello Vazgen");
    });

    app.get("/api/voitures/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const voiture =  Voiture.findByPk(id);
        if (voiture) {
            res.json(success("Voiture trouvée.", voiture));
        } else {
            res.status(404).json({ error: "Voiture non trouvée." });
        }
    });

    app.get('/api/voitures', async (req, res) => {
        const voitures = await Voiture.findAll();
        res.json(success("La liste des voitures a bien été récupérée.", voitures));
    });

    app.post('/api/voitures', async (req, res) => {
        try {
            const voitureCreated = await Voiture.create(req.body);
            res.json(success(`La voiture ${voitureCreated.name} a bien été créée.`, voitureCreated));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.put('/api/voitures/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Voiture.update(req.body, {
                where: { id: id }
            });
            const voitureUpdated = await Voiture.findByPk(id);
            res.json(success(`Le véhicule ${voitureUpdated.name} a bien été modifié.`, voitureUpdated));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.delete('/api/voitures/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const voitureDeleted = await Voiture.findByPk(id);
            if (voitureDeleted) {
                await voitureDeleted.destroy();
                res.json(success(`Le véhicule ${voitureDeleted.name} a bien été supprimé.`, voitureDeleted));
            } else {
                res.status(404).json({ error: "Voiture non trouvée." });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
