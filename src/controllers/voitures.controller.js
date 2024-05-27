const {
    Voiture,
    User
} = require('../db/sequelize.js')

const add = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" })
        }
        // On crée une nouvelle voiture et avec les informations reçues dans le corps de la requête
        const voiture = await user.createVoiture(req.body)
        // On renvoie le nouvel vehicule avec un statut 201
        res.status(201).json(voiture)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la création ! 😭" })
    }
}

module.exports = {
    add
}