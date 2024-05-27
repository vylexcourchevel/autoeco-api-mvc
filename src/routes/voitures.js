const  express = require("express");
const  {
    add
} = require( "../controllers/voitures.controller.js");

const router = express.Router();

// Route POST pour créer un nouvel article
// On utilise un middleware pour vérifier le token
router.post('/', add)


// Exportation du router
module.exports = router;
