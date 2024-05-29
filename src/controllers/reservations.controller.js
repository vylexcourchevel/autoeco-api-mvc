// Importer les modèles Reservation, User, et Voiture depuis le fichier sequelize.js dans le dossier ../db/
const { Reservation, User, Voiture } = require('../db/sequelize');

// Créer une nouvelle réservation
const createReservation = async (req, res) => {
    try {
        // Extraire les données nécessaires (userId, voitureId, status) à partir du corps de la requête
        const { UserId, VoitureId, status } = req.body;

        // Vérifier si l'utilisateur et la voiture existent en recherchant dans la base de données
        const user = await User.findByPk(UserId);
        const voiture = await Voiture.findByPk(VoitureId);

        // Si l'utilisateur ou la voiture n'existe pas, renvoyer une réponse 404 (Not Found)
        if (!user || !voiture) {
            return res.status(404).json({ message: 'User or Voiture not found' });
        }

        // Créer une nouvelle réservation avec les données fournies et la date actuelle
        const newReservation = await Reservation.create({
            UserId,
            VoitureId,
            status,
            created: new Date()
        });

        // Renvoyer une réponse 201 (Created) avec la nouvelle réservation créée
        res.status(201).json(newReservation);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 (Internal Server Error) avec le message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Obtenir toutes les réservations

const getAllReservations = async (req, res) => {
    try {
        // Récupérer toutes les réservations en incluant les détails de l'utilisateur et de la voiture associés à chaque réservation
        const reservations = await Reservation.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Voiture, as: 'voiture' }
            ]
        });

        // Renvoyer une réponse 200 (OK) avec la liste de toutes les réservations
        res.status(200).json(reservations);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 (Internal Server Error) avec le message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une réservation par ID

const getReservationById = async (req, res) => {
    try {
        // Extraire l'ID de la réservation à partir des paramètres de la requête
        const { id } = req.params;
        
        // Rechercher la réservation correspondante dans la base de données en incluant les détails de l'utilisateur et de la voiture associés à la réservation
        const reservation = await Reservation.findByPk(id, {
            include: [
                { model: User, as: 'user' },
                { model: Voiture, as: 'voiture' }
            ]
        });

        // Si la réservation n'existe pas, renvoyer une réponse 404 (Not Found)
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Renvoyer une réponse 200 (OK) avec les détails de la réservation demandée
        res.status(200).json(reservation);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 (Internal Server Error) avec le message d'erreur
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById
    };
  



// // Importation des modèles Reservation, User et Voiture depuis le fichier sequelize.js
// const { Reservation, User, Voiture } = require('../db/sequelize.js');

// /**
//  * Fonction pour récupérer toutes les réservations
//  * @param {Object} req - L'objet de requête HTTP
//  * @param {Object} res - L'objet de réponse HTTP
//  */
// const getAllReservations = async (req, res) => {
//     try {
//         // Utilisation de la méthode findAll pour récupérer toutes les réservations
//         // L'option include permet d'inclure les modèles associés "user" et "voiture"
//         const reservations = await Reservation.findAll({
//             include: ["user", "voiture"],
//         });

//         // Envoi de la réponse avec un statut 200 (OK) et les données des réservations au format JSON
//         res.status(200).json(reservations);
//     } catch (err) {
//         // En cas d'erreur, envoi d'une réponse avec un statut 500 (Erreur interne du serveur)
//         // et un message d'erreur au format JSON
//         res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
//     }
// };

// // Exportation de la fonction getAllReservations pour qu'elle puisse être utilisée dans d'autres fichiers
// module.exports = {
//     getAllReservations,
// };
