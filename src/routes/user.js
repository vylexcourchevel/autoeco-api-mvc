const express = require('express');
const { addUser, getUserByEmail, login } = require('../controllers/users.controller.js');

const router = express.Router();

router.post('/add', addUser);
router.get('/:email', getUserByEmail);
router.post('/login', login);

module.exports = router;
