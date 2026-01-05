const mongoose = require("mongoose"); 

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  allocatedAmount: { type: Number, required: true },
  description: { type: String, required: true },
  spentAmount: { type: Number, default: 0 }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category; 