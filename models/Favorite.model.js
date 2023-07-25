const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Favorite = mongoose.model('Favorite',favoriteSchema);



