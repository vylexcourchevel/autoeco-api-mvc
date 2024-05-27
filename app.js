const express = require("express");
const { success, getUniqueId } = require("./helper.js");
const morgan = require("morgan");
const { Sequelize, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const VoitureModel = require("./src/models/voitures.js");
const ReservationModel = require("./src/models/reservations.js");
const UserModel = require("./src/models/users.js");
const reservations = require("./mock-reservations.js");
const voitures = require("./mock-voitures.js"); 
const users = require("./mock-users.js");

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Connexion à la base de données
const sequelize = new Sequelize('autoeco', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  port: 3306
});

sequelize.authenticate()
  .then(() => console.log('Connexion au serveur de base de données réussie'))
  .catch(error => console.log(`Connexion au serveur de base de données échouée: ${error}`));

// Initialisation des modèles
const Voiture = VoitureModel(sequelize, Sequelize);
const Reservation = ReservationModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

// Définition des relations entre les modèles
User.hasMany(Reservation, { as: "reservations" });
Reservation.belongsTo(User);

Voiture.hasMany(Reservation, { as: "reservations" });
Reservation.belongsTo(Voiture);

// Synchronisation avec la base de données
sequelize.sync({ force: true })
  .then(() => {
    console.log('La table de données a bien été créée');  
        voitures.map(voiture => {
          Voiture.create({
            name: voiture.name,
            model: voiture.model,
            fuelType: voiture.fuelType,
            price: voiture.price,
            kilometre: voiture.kilometre,
            category: voiture.category,
            year: voiture.year,
            picture: voiture.picture,
            available: true,
          }).then(voiture => console.log(voiture.toJSON()))
        })
        users.map(user => { 
          User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            adress: user.adress,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password
          }).then(user => console.log(user.toJSON()))
        })

        reservations.map(reservation => { 
          Reservation.create(reservation).then(reservation => console.log(reservation.toJSON()))
        })
        console.log('La base de donnée a bien été initialisée !')
      })

      app.get('/reservations', async (req, res) => {
      try {
        const reservations = await Reservation.findAll(); // Supposons que vous utilisez Sequelize pour interroger les réservations
        reservations.map(reservation => {
          // Traitez chaque réservation
          console.log(reservation.details);
        });
        res.json(reservations);
      } catch (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
      }
      });



     
      app.get('/users', async (req, res) => {
        try {
          const users = await User.findAll(); // Supposons que vous utilisez Sequelize pour interroger les utilisateurs
          res.json(users); // Vous pouvez renvoyer les utilisateurs comme réponse JSON
        } catch (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        }
      });
      

            

      // Points de terminaison
      app.get("/", (req, res) => {
        res.send("Hello Vazgen");
      });

      app.get("/api/voitures/:id", async (req, res) => {
        try {
          const id = parseInt(req.params.id);
          const voiture = await Voiture.findByPk(id);
          if (voiture) {
            res.json(success("Voiture trouvée.", voiture));
          } else {
            res.status(404).json({ error: "Voiture non trouvée." });
          }
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });

      app.get('/api/voitures', async (req, res) => {
        try {
          const voitures = await Voiture.findAll();
          res.json(success("La liste des voitures a bien été récupérée.", voitures));
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
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

