const express = require('express');
const { getAllReservations } = require('../controllers/reservations.controller.js');

const router = express.Router();

router.get('/', getAllReservations);

module.exports = router;
