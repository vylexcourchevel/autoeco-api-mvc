const {
    Voiture,
    User
} = require('../db/sequelize.js')

const add = async (req, res) => {
    try {
       
        // On crée une nouvelle voiture et avec les informations reçues dans le corps de la requête
        const voiture = await Voiture.create(req.body)
        // On renvoie le nouvel vehicule avec un statut 201
        res.status(201).json(voiture)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la création ! 😭" })
    }
}

const getAll = async (req, res) => {
    try {
        // On récupère tous les voitures
        const voitures = await Voiture.findAll()
        // On renvoie les voitures avec un statut 200
        res.status(200).json(voitures)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        // On récupère la voiturepar son id
        const voiture = await Voiture.findByPk(id)
        // On renvoie la voiture  avec un statut 200
        res.status(200).json(voiture)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}
const updateById = async (req, res) => {
    try {
        // On récupère la voiture par son id
        const voiture = await Voiture.findByPk(req.params.id)
        // On vérifie que l'utilisateur qui fait la requête est bien l'utilisateur qui a créé la voiture
         
            // On met à jour la voiture avec les nouvelles informations reçues dans le corps de la requête
            await voiture.update(req.body);
            // await Voiture.update(req.body, {
            //     where: {
            //         id: req.params.id
            //     }
            // })
            // await Voiture.findByIdAndUpdate(req.params.id, req.body, { new: true })
            // On renvoie la voiture mis à jour avec un statut 200
            return res.status(200).json(article)
       
           
        
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

const deleteById = async (req, res) => {
    try {
        // On récupère la voiture par son id
        const voiture = await Voiture.findByPk(req.params.id)


            // On supprime la voiture
            await voiture.destroy();
            // await Voiture.destroy({
            //     where: {
            //         id: req.params.id
            //     }
            // })
            // On renvoie un message de confirmation avec un statut 200
            res.status(200).json("Voiture deleted ! ")
       
         
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}


module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
}