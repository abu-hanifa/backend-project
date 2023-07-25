const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    cloth: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cloth"
        }
    ]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);


module.exports = Favorite;
