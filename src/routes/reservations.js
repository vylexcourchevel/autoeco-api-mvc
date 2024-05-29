const express = require('express');
const { createReservation, getAllReservations, getReservationById } = require ('../controllers/reservations.controller.js');

const router = express.Router();
// Routes de réservation
router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:id', getReservationById);

module.exports = router;
