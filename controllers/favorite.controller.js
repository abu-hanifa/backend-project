const Favorite = require("../models/Favorite.model");


module.exports.favoriteController = {
    getFavorite: async (req, res) => {
        try {
            const favorites = await Favorite.findOne({
                userId: req.user.id
            })

            res.json(favorites);
        } catch (error) {
            res.status(401).json(
                { message: error.message }
            );
        }
    },

    addFavorite: async (req, res) => {
        try {
            await Favorite.findByIdAndUpdate({ userId: req.user.id }, {
                $push: { cloth: req.params.id }
            })
            res.json("Добавлено")
        } catch (error) {

        }
    },
    deleteFavorite: async (req, res) => {
        try {
            await Favorite.findByIdAndUpdate({ userId: req.user.id }, {
                $pull: { cloth: req.params.id }
            })
            res.json("Удалено")
        } catch (error) {

        }
    }
}

