const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    cloth: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cloth',
    }],
    total: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        defaulf: Date.now,
    },
})


const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;