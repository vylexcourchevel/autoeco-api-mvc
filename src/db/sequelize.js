const { Sequelize, DataTypes } = require("sequelize");
const VoitureModel = require("../models/voitures.model.js");  // Chemin corrigé
const ReservationModel = require("../models/reservations.model.js");  // Chemin corrigé
const UserModel = require("../models/users.model.js");  // Chemin corrigé
const reservations = require("../db/mock-reservations.js");  // Chemin corrigé
const voitures = require("../db/mock-voitures.js");  // Chemin corrigé
const users = require("../db/mock-users.js");  // Chemin corrigé


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
const Voiture = VoitureModel(sequelize, DataTypes);
const Reservation = ReservationModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// Définition des relations entre les modèles
User.hasMany(Reservation, { as: "reservations" });
Reservation.belongsTo(User);

Voiture.hasMany(Reservation, { as: "reservations" });
Reservation.belongsTo(Voiture);

// Synchronisation avec la base de données
sequelize.sync()
    .then(() => {
        console.log('La table de données a bien été créée');
        // voitures.map(voiture => {
        //     Voiture.create({
        //         name: voiture.name,
        //         model: voiture.model,
        //         fuelType: voiture.fuelType,
        //         price: voiture.price,
        //         kilometre: voiture.kilometre,
        //         category: voiture.category,
        //         year: voiture.year,
        //         picture: voiture.picture,
        //         available: true,
        //     })
        // });
        // users.map(user => {
        //     User.create({
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         adress: user.adress,
        //         email: user.email,
        //         phoneNumber: user.phoneNumber,
        //         password: user.password
        //     })
        // });
        // reservations.map(reservation => {
        //     Reservation.create(reservation)
        // });
        console.log('La base de donnée a bien été initialisée !');
    });

 

module.exports = {
    User,
    Voiture,
    Reservation
};
