const Category = require("../models/Category.js"); 

const addCategory = async (req, res) => {
  try {
    const { categoryName, allocatedAmount, description } = req.body;
    const category = new Category({ categoryName, allocatedAmount, description });
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBudgetSummary = async (req, res) => {
  try {
    const categories = await Category.find();
    const summary = categories.map(cat => ({
      _id: cat._id, 
      categoryName: cat.categoryName,
      allocatedAmount: cat.allocatedAmount,
      description: cat.description, 
      spentAmount: cat.spentAmount || 0,
      remainingAmount: cat.allocatedAmount - (cat.spentAmount || 0)
    }));
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,  
  getBudgetSummary,  
  deleteCategory
};