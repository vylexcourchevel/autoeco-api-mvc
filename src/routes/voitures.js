const express = require('express');
const { add, getAll, getById, updateById, deleteById } = require('../controllers/voitures.controller.js');

const router = express.Router();

router.post('/add', add); // Ajouter une voiture
router.get('/', getAll); // Obtenir toutes les voitures
router.get('/:id', getById); // Obtenir une voiture par ID
router.put('/:id', updateById); // Mettre à jour une voiture par ID
router.delete('/:id', deleteById); // Supprimer une voiture par ID

module.exports = router;
