const mongoose = require("mongoose");

const clothSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  size: [{ size: String, inStock: Number }],
  image: [],
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Cloth = mongoose.model("Cloth", clothSchema);

module.exports = Cloth;
