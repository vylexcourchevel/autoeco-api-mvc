const { Reservation, User, Voiture } = require('../models');

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: ["user", "voiture"],
        });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
    }
};

module.exports = {
    getAllReservations,
};
