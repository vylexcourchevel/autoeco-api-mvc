const { User, Reservation } = require('../models');

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email, password } });

        if (!user) {
            return res.status(401).json({ error: "Identifiants incorrects" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ error: "Accès refusé" });
        }

        res.status(200).json({ message: "Connexion réussie", user });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};

module.exports = {
    addUser,
    getUserByEmail,
    login,
};
